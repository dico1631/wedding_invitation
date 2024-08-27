"use client";
import React, { useState, useEffect } from "react";

function JinwooMinjae() {

  // 계좌번호 토글
  const [groomOpen, setGroomOpen] = useState(false);
  const [brideOpen, setBrideOpen] = useState(false);

  // 카운트다운
  const [day1, setDay1] = useState(0);
  const [day2, setDay2] = useState(0);
  const [hour1, setHour1] = useState(0);
  const [hour2, setHour2] = useState(0);
  const [minute1, setMinute1] = useState(0);
  const [minute2, setMinute2] = useState(0);

  useEffect(() => {
    function updateTimer() {
      const targetDate = new Date("2024-11-03T11:00:00").getTime();
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      setDay1(Math.floor(days / 10));
      setDay2(days % 10);

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setHour1(Math.floor(hours / 10));
      setHour2(hours % 10);

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      setMinute1(Math.floor(minutes / 10));
      setMinute2(minutes % 10);

      if (distance < 0) {
        clearInterval(timerInterval);
      }
    }

    const timerInterval = setInterval(updateTimer, 60000);
    updateTimer();

    return () => clearInterval(timerInterval);
  }, []);

  // 지도앱 연결
  const goalName = encodeURIComponent("대전광역시 서구 문정로 40");
  const goalX = 127.383600;  // 예시 경도
  const goalY = 36.345230;   // 예시 위도

  // 네이버 지도 앱 URL과 웹 URL
  const naverMapRouteUrl = `nmap://route/public?dlat=${goalY}&dlng=${goalX}&dname=${goalName}&appname=com.example.myapp`;
  const naverWebPlaceUrl = `https://map.naver.com/v5/search/${goalName}`;

  // T map URL
  const tmapRouteUrl = `tmap://route?goalname=${goalName}&goalx=${goalX}&goaly=${goalY}`;

  // 카카오 지도 앱 URL과 웹 URL
  const kakaoMapRouteUrl = `kakaomap://route?ep=${goalY},${goalX}&by=CAR`;
  const kakaoWebPlaceUrl = `https://map.kakao.com/?q=${goalName}`;
  
  const openMap = (appUrl: string, webUrl?: string) => {
    window.location.href = appUrl;

    if (webUrl) {
      setTimeout(() => {
        window.location.href = webUrl;
      }, 500); // 앱이 없을 경우, 웹 브라우저로 이동
    } else {
      setTimeout(() => {
        alert("앱이 설치되어 있지 않습니다.");
      }, 500); // 앱이 없을 경우 알림
    }
  };


  return (
    <div>

      <section>
        <span>
          {/* GIF 위치 */}
        </span>
      </section>
      <article>
        <span>
          {/* 이미지 위치 */}
        </span>
        <span>
          함께 맞이하는 여섯 번째 가을,
          저희 두 사람이 새 출발의 첫걸음을 내딛습니다.
          좋은 꿈, 바른 뜻으로 올바르게 살 수 있도록
          축복과 격려 주시면 더없는 기쁨으로 간직하겠습니다.
        </span>
      </article>
      <article>
        <span>
          {/* 작은 꽃 이미지 위치 */}
        </span>
        <figure>
          {/* <image></image> */}
          <fieldset>
            <h3>이기웅·박지연의 장남</h3>
            <h2><span>신랑</span> 진우</h2>
            <span>
              1995년, 대전 출생
              #자유로운영혼 #행동파
            </span>
          </fieldset>
        </figure>
        <figure>
          {/* <image></image> */}
          <fieldset>
            <h4>신범식·우영숙의 장녀</h4>
            <h2><span>신부</span> 민재</h2>
            <span>
              1996년, 충주 출생
              #청렴결백 #현실주의자
            </span>
          </fieldset>
        </figure>
      </article>
      <article>
        <h2>Wedding Day</h2>
        <h3>
          2024.11.3 일요일 오전 11:00
          라포르테 웨딩홀 5층
        </h3>
        <span>
          {/* 달력 이미지 위치 */}
        </span>
        <section className="countdown">
					<dl>
            <dt>Days</dt>
            <dd>
              <div>{day1}</div>
              <div>{day2}</div>
            </dd>
          </dl>
          <dl>
            <dt>Hours</dt>
            <dd>
              <div>{hour1}</div>
              <div>{hour2}</div>
            </dd>
          </dl>
          <dl>
            <dt>Mins</dt>
            <dd>
              <div>{minute1}</div>
              <div>{minute2}</div>
            </dd>
          </dl>
				</section>
      </article>
      <article>
        <h2>Gallery</h2>
        {/* swiper 슬라이드 */}
      </article>
      <article>
        <h2>Location</h2>
        <h3>
          대전광역시 서구 문정로 40
          라포르테 웨딩홀
        </h3>
        <span>
          {/* 지도 이미지 위치 */}
        </span>
        <menu>
          <li>
            <button onClick={() => openMap(naverMapRouteUrl, naverWebPlaceUrl)}>네이버 지도</button>
          </li>
          <li>
            <button onClick={() => openMap(tmapRouteUrl)}>T MAP</button>
          </li>
          <li>
            <button onClick={() => openMap(kakaoMapRouteUrl, kakaoWebPlaceUrl)}>카카오 지도</button>
          </li>
        </menu>
        <dl>
          <dt>버스</dt>
          <dd>
            <ul>
              <li>104</li>
              <li>105</li>
              <li>706</li>
              <li>618</li>
            </ul>
            탄방동 1번 출구, 국민연금대전지사(녹원아파트)에서 하차
          </dd>
        </dl>
        <dl>
          <dt>지하철</dt>
          <dd>
            대전 지하철 탄방역 2번 출구 전방 50m 좌측에 위치
          </dd>
        </dl>
        <dl>
          <dt>자차</dt>
          <dd>
            ‘라포르테 웨딩홀’ 검색 후 주차장 이용
            본관 지하 1, 2층 및 지상 1층 주차장 이용
          </dd>
        </dl>
        <section>※ 주차장이 협소하여 지하철을 이용하시면 가장 편리합니다.</section>
      </article>
      <article>
        <h2>마음 전하실 곳</h2>
        <dl>
          <dt>
            <button onClick={() => setGroomOpen(!groomOpen)}>신랑측 계좌번호</button>
          </dt>
          <dd>
            <ul>
              <li>
                <dl>
                  <dt><span>신랑</span> 이진우</dt>
                  <dd><span>국민은행</span> 344902-04-204588</dd>
                </dl>
                <span>
                  <button>복사</button>
                  <button>pay</button>
                </span>
              </li>
              <li>
                <dl>
                  <dt><span>신랑 아버지</span> 이기웅</dt>
                  <dd><span>하나은행</span> 622-910192-37507</dd>
                </dl>
                <span>
                  <button>복사</button>
                  <button>pay</button>
                </span>
              </li>
              <li>
                <dl>
                  <dt><span>신랑 어머니</span> 박지연</dt>
                  <dd><span>국민은행</span> 745401-01-126155</dd>
                </dl>
                <span>
                  <button>복사</button>
                  <button>pay</button>
                </span>
              </li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>
            <button onClick={() => setBrideOpen(!brideOpen)}>신부측 계좌번호</button>
          </dt>
          <dd>
            <ul>
              <li>
                <dl>
                  <dt><span>신부</span> 신민재</dt>
                  <dd><span>우리은행</span> 1002-860-037514</dd>
                </dl>
                <span>
                  <button>복사</button>
                  <button>pay</button>
                </span>
              </li>
              <li>
                <dl>
                  <dt><span>신부 아버지</span> 이기웅</dt>
                  <dd><span>우리은행</span> 1002-732-309003</dd>
                </dl>
                <span>
                  <button>복사</button>
                  <button>pay</button>
                </span>
              </li>
              <li>
                <dl>
                  <dt><span>신부 어머니</span> 박지연</dt>
                  <dd><span>우리은행</span> 1002-958-873187</dd>
                </dl>
                <span>
                  <button>복사</button>
                  <button>pay</button>
                </span>
              </li>
            </ul>
          </dd>
        </dl>
      </article>
      <section>
        <button>카카오톡<br/>공유</button>
        <button>링크<br/>복사하기</button>
      </section>
    </div>
  );
}

export default JinwooMinjae;