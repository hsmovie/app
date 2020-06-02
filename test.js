import Table from './Table.js';
import DriverInfoModal from './DriverInfoModal.js';
import { validateAllocatedOrders } from './utils/validator.js';
import { getDistance, getAddedTime, isFaster, sortBy } from './utils/util.js';

export default class Dashboard {
  $target = null;
  $driverTable = null;
  $driverTableSortInfo = null;
  $driverInfoModal = null;

  data = {
    drivers: [],
    orders: [],
    places: [],
  };
  driverData = [];
  freeAmount = 0;
  localStorage = window.localStorage;
  sort = localStorage.getItem('sortInfo')
    ? JSON.parse(localStorage.getItem('sortInfo'))
    : { index: 0, isDescending: false };

  constructor($target) {
    this.$target = $target;

    this.createHeader($target);
    this.createAllocateButton($target);
    this.createDriverTable($target);
    this.createModals($target);
    this.createTextArea($target);
  }

  createHeader($target) {
    const $h1 = document.createElement('h1');
    $h1.innerText = '드라이버 현황 페이지';

    $target.appendChild($h1);
  }

  createAllocateButton($target) {
    function handleAllocateClick() {
      // // TODO: 배차 로직 구현 부분

      // 현재 상태에서
      const driverInfo = [];
      this.driverData.forEach((driver) => {
        let info = {
          lastDeliveredAt: '',
          id: driver.id,
          position: this.data.drivers.filter((d) => d.id === driver.id)[0]
            .position,
        };
        //마지막 주문의 완료시간과 아이디, 위치를 구한다
        if (driver.orders.length !== 0) {
          const order = driver.orders.slice(-1)[0]; // 마지막 주문

          if (order.deliveredAt !== '') {
            info.lastDeliveredAt = order.deliveredAt;
          } else if (order.pickedUpAt !== '') {
            // 목적지로 배달중
            const distance = getDistance(info.position, order.deliveryPosition);
            const time = getAddedTime('13:00', distance);
            info.lastDeliveredAt = time;
          } else {
            // 식당으로 픽업중
            const placePosition = this.data.places.find(
              (place) => place.id === order.placeId
            ).position;
            const distance =
              getDistance(info.position, placePosition) +
              getDistance(placePosition, order.deliveryPosition);
            const time = getAddedTime('13:00', distance);
            info.lastDeliveredAt = time;
          }

          info.position = order.deliveryPosition;
        }

        driverInfo.push(info);
      });

      // 다음 주문이 들어왔을 때
      this.data.orders
        .filter((order) => !order.driverId)
        .forEach((order) => {
          // 드라이버의 마지막 주문의 배달완료시간이 주문의 주문시간보다 빠른가? 또는 드라이버의 오더가 없는가?
          let candidates = driverInfo.filter(
            (driver) =>
              driver.lastDeliveredAt === '' ||
              isFaster(driver.lastDeliveredAt, order.orderedAt)
          );

          // 그런 드라이버가 없으면 전체 드라이버를 대상으로
          candidates.length === 0 ? (candidates = driverInfo) : candidates;

          // 드라이버의 배달완료지점과 주문지 거리가 몇인가?
          let idAndMinDistance = [];
          candidates.forEach((driver) => {
            let id = driver.id;
            let distance = getDistance(order.deliveryPosition, driver.position);

            if (idAndMinDistance.length === 0 || idAndMinDistance[1] > distance)
              idAndMinDistance = [id, distance];
          });

          // driverData에서 그 드라이버의 reservedOrderCount 추가
          {
            const driver = this.driverData.find(
              (driver) => driver.id === idAndMinDistance[0]
            );
            driver.reservedOrders.push(order);
          }

          // 그 드라이버의 마지막 주문의 완료시간 갱신, 위치 갱신
          const placePosition = this.data.places.find(
            (place) => place.id === order.placeId
          ).position;
          const d = driverInfo.find(
            (driver) => driver.id === idAndMinDistance[0]
          );
          const totalDistance =
            getDistance(d.position, placePosition) +
            getDistance(placePosition, order.deliveryPosition);
          d.lastDeliveredAt = getAddedTime(d.lastDeliveredAt, totalDistance);
          d.position = order.deliveryPosition;

          // 60분보다 많이 걸리면 무료금액 증가
          const [orderedH, orderedM] = order.orderedAt
            .split(':')
            .map((i) => parseInt(i));
          const [deliveredH, deliveredM] = d.lastDeliveredAt
            .split(':')
            .map((i) => parseInt(i));

          if (orderedH < deliveredH && orderedM < deliveredM) {
            this.freeAmount += order.price;
          }
        });

      /**
       * 채점용 코드입니다. 여기부터
       */

      const checkOrders = validateAllocatedOrders(
        this.driverData,
        this.data.orders
      );
      if (!checkOrders) {
        alert('모든 주문이 하나씩 배차되어야 합니다.');
        return;
      }

      var textArea = document.getElementsByTagName('TEXTAREA')[0];
      const driverDataJson = JSON.stringify(this.driverData);
      textArea.value = driverDataJson;
      textArea.select();
      document.execCommand('copy');

      console.log(JSON.stringify(this.driverData));

      this.render();
      /**
       * 여기까지 코드를 수정하지 마세요
       */

      alert(`배차 결과 예상 무료 제공 매출은 ${this.freeAmount}원 입니다.`);
    }

    const $container = document.createElement('section');
    $container.className = 'display-flex justify-end';

    const $buttonAllocate = document.createElement('button');
    $buttonAllocate.innerText = '배차하기';
    $buttonAllocate.addEventListener('click', handleAllocateClick.bind(this));
    $container.appendChild($buttonAllocate);

    $target.appendChild($container);
  }

  createDriverTable($target) {
    const driverTableHeaders = [
      '이름',
      '첫 배달 접수 시간',
      '배달 완료된 매출',
      '오늘 이동한 거리',
      '이후 배달 일정',
    ];

    const handleHeaderClick = (index) => {
      if (index === 4) return;

      if (index === this.sort.index) {
        this.sort.isDescending = !this.sort.isDescending;
      } else {
        this.sort.index = index;
        this.sort.isDescending = false;
      }

      localStorage.setItem('sortInfo', JSON.stringify(this.sort));

      sortBy(this.driverData, this.sort);

      this.render();
    };

    const $container = document.createElement('div');
    $container.className = 'display-flex justify-end';
    this.$driverTableSortInfo = $container;
    $target.appendChild($container);

    this.renderSortInfo(
      driverTableHeaders[this.sort.index],
      this.sort.isDescending
    );

    this.$driverTable = new Table($target);
    this.$driverTable.createTableHeaders(driverTableHeaders, handleHeaderClick);
  }

  createModals($target) {
    this.$driverInfoModal = new DriverInfoModal($target);
  }

  createTextArea($target) {
    const $textArea = document.createElement('TEXTAREA', { id: 'result' });
    $target.appendChild($textArea);
  }

  aggregateDriverData() {
    const aggregatedDriverData = [];

    this.data.drivers.forEach((driver) => {
      const driverInfo = {
        id: driver.id,
        name: driver.name,
        firstOrderedAt: '',
        todayDeliveryMenuPrice: 0,
        todayDeliveryDistance: 0,
        reservedOrders: [],
        orders: [],
        position: driver.position,
      };

      const driverOrders = this.data.orders.filter(
        (order) => order.driverId === driver.id
      );

      driverInfo.orders = driverOrders;

      /**
       * 첫 배달 접수 시간
       */
      if (driverOrders.length > 0) {
        driverInfo.firstOrderedAt = driverOrders[0].orderedAt;
      }

      let driverPosition = [56, 56];

      driverInfo.orders.forEach((order, idx) => {
        /**
         * 배달 완료된 매출
         */

        if (order.deliveredAt !== '') {
          const [orderedH, orderedM] = order.orderedAt
            .split(':')
            .map((i) => parseInt(i));
          const [deliveredH, deliveredM] = order.deliveredAt
            .split(':')
            .map((i) => parseInt(i));

          if (orderedH < deliveredH && orderedM < deliveredM) {
            this.freeAmount += order.price;
          } else {
            driverInfo.todayDeliveryMenuPrice += order.price;
          }
        }

        /**
         * 오늘 이동한 거리
         */
        const placePosition = this.data.places.filter(
          (place) => place.id === order.placeId
        )[0].position;
        const driverCurrentPosition = this.data.drivers.filter(
          (d) => d.id === driver.id
        )[0].position;

        if (order.deliveredAt !== '') {
          driverInfo.todayDeliveryDistance +=
            getDistance(order.deliveryPosition, placePosition) +
            getDistance(placePosition, driverPosition);
          driverPosition = order.deliveryPosition;
        } else if (order.pickedUpAt !== '') {
          driverInfo.todayDeliveryDistance +=
            getDistance(driverCurrentPosition, placePosition) +
            getDistance(placePosition, driverPosition);
          driverPosition = order.driverCurrentPosition;
        } else {
          driverInfo.todayDeliveryDistance += getDistance(
            driverCurrentPosition,
            driverPosition
          );
          driverPosition = order.driverCurrentPosition;
        }
      });

      aggregatedDriverData.push(driverInfo);
    });

    sortBy(aggregatedDriverData, this.sort);

    console.log(aggregatedDriverData);
    this.driverData = aggregatedDriverData;
  }

  setState(data) {
    this.data = data;
    this.aggregateDriverData();
    this.render();
  }

  renderSortInfo(header, isDescending) {
    const sort = isDescending ? '내림차순' : '오름차순';
    this.$driverTableSortInfo.innerHTML = `
            <span>정렬: ${header}(${sort})</span>
        `;
  }

  render() {
    function handleDriverClick(item) {
      this.$driverInfoModal.setState({
        visible: true,
        places: this.data.places,
        driver: item,
      });
    }

    const driverTableHeaders = [
      '이름',
      '첫 배달 접수 시간',
      '배달 완료된 매출',
      '오늘 이동한 거리',
      '이후 배달 일정',
    ];

    this.renderSortInfo(
      driverTableHeaders[this.sort.index],
      this.sort.isDescending
    );

    this.$driverTable.render(
      this.driverData,
      (item) => {
        const reservedOrderCount = item.reservedOrders.length;
        return `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.firstOrderedAt}</td>
                    <td>${item.todayDeliveryMenuPrice}</td>
                    <td>${item.todayDeliveryDistance}</td>
                    <td>${
                      reservedOrderCount > 0
                        ? `${reservedOrderCount}개 오더 수행 예정`
                        : `이후 배달 일정이 없습니다.`
                    }
                    </td>
                </tr>
            `;
      },
      handleDriverClick.bind(this)
    );
  }
}
