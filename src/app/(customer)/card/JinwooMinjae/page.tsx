"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import SwiperCore from 'swiper';
// import Kakao from "kakao-js-sdk";

import './reset.css';
import './card.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';

type AccountInfo = {
  name: string;
  bank: string;
  accountNumber: string;
  position: string;
};

const groomAccounts: AccountInfo[] = [
  { name: '이진우', bank: '국민은행', accountNumber: '344902-04-204588', position: '신랑' },
  { name: '이기웅', bank: '하나은행', accountNumber: '622-910192-37507', position: '신랑 아버지'  },
  { name: '박지연', bank: '국민은행', accountNumber: '745401-01-126155', position: '신랑 어머니'  }
];
const brideAccounts: AccountInfo[] = [
  { name: '신민재', bank: '우리은행', accountNumber: '1002-860-037514', position: '신부'  },
  { name: '신범식', bank: '우리은행', accountNumber: '1002-732-309003', position: '신부 아버지'  },
  { name: '우영숙', bank: '우리은행', accountNumber: '1002-958-873187', position: '신부 어머니'  }
];

declare global {
  interface Window {
    Kakao: any;
  }
}

function JinwooMinjae() {

  // 계좌번호 토글
  const [groomOpen, setGroomOpen] = useState(true);
  const [brideOpen, setBrideOpen] = useState(true);

  
  const copyGroomToClipboard = (bank: string, accountNumber: string) => {
    const textToCopy = `${bank} ${accountNumber}`;

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(textToCopy)
        .then(() => alert('계좌번호가 복사되었습니다.'))
        .catch((err) => console.error('복사 실패:', err));
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('계좌번호가 복사되었습니다.');
      } catch (err) {
        console.error('복사 실패:', err);
      }
      document.body.removeChild(textArea);
    }
  };

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


  // url 공유하기
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('0c6180529cd31fd05720bddc63f9bc77');
    }
  }, []);
  const handleKakaoShare = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '11월 3일 이진우 ♥ 신민재 결혼합니다. ',
        description: '여기를 눌러 링크를 확인하세요. ',
        imageUrl: '/images/main/main.png',
        link: {
          mobileWebUrl: 'https://bloomingday.kro.kr/card/JinwooMinjae',
          webUrl: 'https://bloomingday.kro.kr/card/JinwooMinjae', 
        },
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: 'https://bloomingday.kro.kr/card/JinwooMinjae',
            webUrl: 'https://bloomingday.kro.kr/card/JinwooMinjae',
          },
        },
      ],
    });
  };
  const handleLinkCopy = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert("링크가 복사되었습니다!");
      })
      .catch(() => {
        alert("링크 복사에 실패했습니다.");
      });
  };


  // 슬라이드
  SwiperCore.use([Navigation]);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  // 전체 화면 모달 열기
  const openFullscreen = (index: number) => {
    setInitialSlide(index);
    setIsFullscreen(true);
  };

  // 전체 화면 모달 닫기
  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const images = [
    "/images/slide/1.jpg",
    "/images/slide/2.jpg",
    "/images/slide/3.jpg",
    "/images/slide/4.jpg",
    "/images/slide/5.jpg",
    "/images/slide/6.jpg",
    "/images/slide/7.jpg",
    "/images/slide/8.jpg",
    "/images/slide/9.jpg",
    "/images/slide/10.jpg",
    "/images/slide/11.jpg",
    "/images/slide/12.jpg",
    "/images/slide/13.jpg",
    "/images/slide/14.jpg",
    "/images/slide/15.jpg",
    "/images/slide/16.jpg",
    "/images/slide/17.jpg",
    "/images/slide/18.jpg",
    "/images/slide/19.jpg",
    "/images/slide/20.jpg",
    "/images/slide/21.jpg",
    "/images/slide/22.jpg",
    "/images/slide/23.jpg",
    "/images/slide/24.jpg",
    "/images/slide/25.jpg",
    "/images/slide/26.jpg",
    "/images/slide/27.jpg",
    "/images/slide/28.jpg",
    "/images/slide/29.jpg",
    "/images/slide/30.jpg",
    "/images/slide/31.jpg",
    "/images/slide/32.jpg",
    "/images/slide/33.jpg",
    "/images/slide/34.jpg",
    "/images/slide/35.jpg",
    "/images/slide/36.jpg",
    "/images/slide/37.jpg",
    "/images/slide/38.jpg",
    "/images/slide/39.jpg"
  ];

  return (
    <div className="centerBox w100p">
      <section className="centerBox _column w100p mxw480">
        <section>
          <Image src="/images/main/main.gif"
            alt="main"
            layout="intrinsic"
            width={900}
            height={1569}
            style={{ maxWidth: '100%', height: 'auto' }}
            unoptimized
            >
          </Image>
        </section>
        <article className="centerBox _column w100p" style={{padding: '180px 34px 110px 34px'}}>
          <span style={{position: 'relative', maxWidth: '100%', height: 'auto', marginBottom: '23px'}}>
            <Image src="/images/main/img_title.png"
              alt="wedding invitation"
              layout="intrinsic"
              width={550}
              height={202}
              style={{position: 'absolute', top: '-84px', left: '-8px', width: '275px', maxWidth: '275px', height: 'auto'}}
              >
            </Image>
            <Image src="/images/main/main.png"
              alt="main"
              layout="intrinsic"
              width={1086}
              height={897}
              style={{ maxWidth: '100%', height: 'auto' }}
              >
            </Image>
          </span>
          <span className="rightAlignBox w100p tARight fontContent fontAB fontGry">
            함께 맞이하는 여섯 번째 가을,<br/>
            저희 두 사람이 새 출발의 첫걸음을 내딛습니다.<br/>
            좋은 꿈, 바른 뜻으로 올바르게 살 수 있도록<br/>
            축복과 격려 주시면 더없는 기쁨으로 간직하겠습니다.
          </span>
        </article>
        <article className="centerBox _column w100p" style={{padding: '0px 18px 102px 18px'}}>
          <Image src="/images/icon/icn_flower.svg"
            alt="mini flower"
            layout="intrinsic"
            width={21}
            height={29}
            style={{ maxWidth: '100%', height: 'auto', marginBottom: '45px' }}
            >
          </Image>
          <section className="gridBox w100p">
            <figure className="imgTxtBox">
              <Image src="/images/etc/boy.png"
                alt="boy"
                layout="intrinsic"
                width={576}
                height={621}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                >
              </Image>
              <fieldset className="fontAB fontBlack content" style={{fontSize: '13px', lineHeight: '28px', letterSpacing: '0.13rem'}}>
                <h3 className="fontAB" style={{fontSize: '12px'}}>
                  <span className="fontAB fontBold" style={{fontSize: '15px'}}>이기웅·박지연</span>
                  의 장남
                </h3>
                <h2 className="fontAB fontBold" style={{fontSize: '17px'}}>
                  <span className="fontAB fontBlu" style={{fontSize: '13px'}}>신랑</span>
                   &nbsp;진우
                  </h2>
                <span className="fontAB fontLight fontGry" style={{marginTop: '5px', fontSize: '13px', lineHeight: '23px', letterSpacing: '0'}}>
                  1995년, 대전 출생<br/>
                  #자유로운영혼 #행동파
                </span>
              </fieldset>
            </figure>
            <figure className="imgTxtBox">
              <Image src="/images/etc/girl.png"
                alt="girl"
                layout="intrinsic"
                width={576}
                height={621}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                >
              </Image>
              <fieldset className="fontAB fontBlack content" style={{fontSize: '13px', lineHeight: '28px', letterSpacing: '0.13rem'}}>
                <h3 className="fontAB" style={{fontSize: '12px'}}>
                  <span className="fontAB fontBold" style={{fontSize: '15px'}}>신범식·우영숙</span>
                  의 장녀
                </h3>
                <h2 className="fontAB fontBold" style={{fontSize: '17px'}}>
                  <span className="fontAB fontPink" style={{fontSize: '13px'}}>신부</span>
                   &nbsp;민재
                  </h2>
                <span className="fontAB fontLight fontGry" style={{marginTop: '5px', fontSize: '13px', lineHeight: '23px', letterSpacing: '0'}}>
                1996년, 충주 출생<br/>
                  #청렴결백 #현실주의자
                </span>
              </fieldset>
            </figure>
          </section>
        </article>
        <article className="centerBox _column w100p" style={{padding: '0px 80px 110px 80px'}}>
          <h2 className="fontEn fontPink fontSubTitle">Wedding Day</h2>
          <h3 className="w100p fontAB fontBlack fontInfo tACenter" style={{paddingBottom: '25px', marginBottom: '27px', borderBottom: '1px solid rgba(112,112,112,0.5)'}}>
            2024.11.3 일요일 오전 11:00<br/>
            라포르테 웨딩홀 5층
          </h3>
          <span className="centerBox w100p" style={{ padding: '0px 7px'}}>
            <Image src="/images/etc/calendar.png"
              alt="calendar"
              layout="intrinsic"
              width={781}
              height={543}
              style={{ maxWidth: '100%', height: 'auto'}}
              >
            </Image>
          </span>
          <section className="countdown">
            <dl>
              <dt className="fontEn fontPink">Days</dt>
              <dd className="gridBox">
                <div className="numberCard fontEn">{day1}</div>
                <div className="numberCard fontEn">{day2}</div>
              </dd>
            </dl>
            <dl>
              <dt className="fontEn fontPink">Hours</dt>
              <dd className="gridBox">
                <div className="numberCard fontEn">{hour1}</div>
                <div className="numberCard fontEn">{hour2}</div>
              </dd>
            </dl>
            <dl>
              <dt className="fontEn fontPink">Mins</dt>
              <dd className="gridBox">
                <div className="numberCard fontEn">{minute1}</div>
                <div className="numberCard fontEn">{minute2}</div>
              </dd>
            </dl>
          </section>
        </article>
        <article className="centerBox _column w100p" style={{padding: '0px 0px 107px 0px'}}>
          <h2 className="fontEn fontPink fontSubTitle">Gallery</h2>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={5}
            slidesPerView={4.4}
            freeMode={true}
            loop={true}
            navigation={true}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            className="thumbSwiper"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  width={96}
                  height={130}
                  style={{ objectFit: 'cover', width: '100%', height: '130px', borderRadius: '4px' }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            style={{padding: '0px 50px'}}
            className="swiperContainer"
            loop={true}
            spaceBetween={50}
            slidesPerView={1}
            navigation={true}
            centeredSlides={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index} onClick={() => openFullscreen(index)}>
                <Image src={src}
                  alt={`Slide ${index + 1}`}
                  layout="intrinsic"
                  width={860} 
                  height={1321}
                  style={{ maxWidth: '100%', height: 'auto' }}
                  >
                </Image>
              </SwiperSlide>
            ))}
          </Swiper>
          {isFullscreen && (
            <div className="fullscreen-modal">
              <button type="button" className="close-btn" onClick={closeFullscreen}>
                닫기
              </button>
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                initialSlide={initialSlide} // 클릭한 슬라이드를 기준으로 설정
                navigation={false}
                loop={true}
              >
                {images.map((src, index) => (
                  <SwiperSlide key={index}>
                    <Image src={src}
                      alt={`popSlide ${index + 1}`}
                      layout="intrinsic"
                      width={860} 
                      height={1321}
                      style={{ maxWidth: '100%', height: 'auto' }}
                      >
                    </Image>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </article>
        <article className="centerBox _column w100p" style={{padding: '0px 36px 100px 36px'}}>
          <h2 className="fontEn fontPink fontSubTitle">Location</h2>
          <h3 className="fontAB fontBlack fontInfo tACenter textDecoNone" style={{marginBottom: '38px'}}>
            대전광역시 서구 문정로 40<br/>
            라포르테 웨딩홀
          </h3>
          <Image src="/images/etc/map.png"
            alt="map"
            layout="intrinsic"
            width={984} 
            height={873}
            style={{ maxWidth: '100%', height: 'auto', paddingRight: '30px' }}
            >
          </Image>
          <menu className="buttonList">
            <li>
              <button type="button" className="mapButton _naver fontPD" onClick={() => openMap(naverMapRouteUrl, naverWebPlaceUrl)}>네이버</button>
            </li>
            <li>
              <button type="button" className="mapButton _tmap fontPD" onClick={() => openMap(tmapRouteUrl)}>T MAP</button>
            </li>
            <li>
              <button type="button" className="mapButton _kakao fontPD" onClick={() => openMap(kakaoMapRouteUrl, kakaoWebPlaceUrl)}>카카오</button>
            </li>
          </menu>
          <dl className="list">
            <dt className="fontPD fontGry fontBold">🚌 버스</dt>
            <dd className="fontPD fontGry">
              <ul className="pillList">
                <li className="pill">104</li>
                <li className="pill">105</li>
                <li className="pill">706</li>
                <li className="pill _green">618</li>
              </ul>
              탄방동 1번 출구, 국민연금대전지사(녹원아파트)에서 하차
            </dd>
          </dl>
          <dl className="list">
            <dt className="fontPD fontGry fontBold">🚇️ 지하철</dt>
            <dd className="fontPD fontGry">
              대전 지하철 탄방역 2번 출구 전방 50m 좌측에 위치
            </dd>
          </dl>
          <dl className="list">
            <dt className="fontPD fontGry fontBold">🚗 자차</dt>
            <dd className="fontPD fontGry" style={{borderBottom: 'none'}}>
              ‘라포르테 웨딩홀’ 검색 후 주차장 이용
              본관 지하 1, 2층 및 지상 1층 주차장 이용
            </dd>
          </dl>
          <section className='w100p tACenter fontGry fontSubInfo' style={{marginTop: '15px'}}>※ 주차장이 협소하여 지하철을 이용하시면 가장 편리합니다.</section>
        </article>
        <article className="centerBox _column w100p" style={{padding: '0px 64px 118px 64px'}}>
          <h2 className="fontAB fontPink fontSubTitle">마음 전하실 곳</h2>
          <dl className="toggleList groom">
            <dt className="toggleButtonBox">
              <button type="button" className={`toggleButton fontBlack fontPD ${groomOpen ? "open" : ""}`} onClick={() => setGroomOpen(!groomOpen)}>신랑측 계좌번호</button>
            </dt>
            <dd className={`openListBox ${groomOpen ? "open" : ""}`}>
              <ul className="openList">
                {groomAccounts.map((account, index) => (
                  <li key={index}>
                    <dl className="info">
                      <dt className="fontPD fontBlack textDecoNone"><span className="fontPD position textDecoNone">{account.position}</span> {account.name}</dt>
                      <dd className="fontPD fontBlack textDecoNone"><span className="fontPD bank textDecoNone">{account.bank}</span> {account.accountNumber}</dd>
                    </dl>
                    <span className="buttonBox">
                      <button type="button" className="fontPD fontBlack copy" onClick={() => copyGroomToClipboard(account.bank, account.accountNumber)}>복사</button>
                    </span>
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
          <dl className="toggleList bride">
            <dt className="toggleButtonBox">
              <button type="button" className={`toggleButton fontBlack fontPD ${brideOpen ? "open" : ""}`} onClick={() => setBrideOpen(!brideOpen)}>신부측 계좌번호</button>
            </dt>
            <dd className={`openListBox ${brideOpen ? "open" : ""}`}>
              <ul className="openList">
              {brideAccounts.map((account, index) => (
                  <li key={index}>
                    <dl className="info">
                      <dt className="fontPD fontBlack"><span className="fontPD position">{account.position}</span> {account.name}</dt>
                      <dd className="fontPD fontBlack"><span className="fontPD bank">{account.bank}</span> {account.accountNumber}</dd>
                    </dl>
                    <span className="buttonBox">
                      <button type="button" className="fontPD fontBlack copy" onClick={() => copyGroomToClipboard(account.bank, account.accountNumber)}>복사</button>
                    </span>
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
        </article>
        <section className="footer">
          <button type="button" onClick={handleKakaoShare} className="button">
            <Image src="/images/icon/icn_kakao.svg"
              alt="map"
              layout="intrinsic"
              width={20} 
              height={19}
              style={{ maxWidth: '100%', height: 'auto'}}
              >
            </Image>
            <span className="fontPD fontLightGry">카카오톡<br/>공유</span>
          </button>
          <button type="button" onClick={handleLinkCopy} className="button">
            <Image src="/images/icon/icn_link.svg"
              alt="map"
              layout="intrinsic"
              width={19} 
              height={19}
              style={{ maxWidth: '100%', height: 'auto'}}
              >
            </Image>
            <span className="fontPD fontLightGry">링크<br/>복사하기</span>
          </button>
        </section>
      </section>
    </div>
  );
}

export default JinwooMinjae;