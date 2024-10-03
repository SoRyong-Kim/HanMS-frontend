import React, { useState } from 'react';
import './Subjects.css';
import axios from 'axios';

function Subjects() {
  const [urls, setUrls] = useState([]); // 추가된 사이트 URL을 저장하는 상태
  const [dataList, setDataList] = useState([]); // 각 URL에 대한 데이터를 저장하는 상태
  const [newUrl, setNewUrl] = useState(''); // 새로운 URL을 입력받는 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // 오류 메시지 상태

  // 미리 정의된 치료법 키워드 리스트
  const treatmentKeywords = [
    '심장 수술', '관상동맥 우회술', '간암 치료', '방사선 치료',
    '내시경 치료', '척추 교정', '치과 임플란트', '백내장 수술', '추나요법', '치료법', '호흡기'
  ];

  // URL을 추가하는 함수
  const addUrl = () => {
    if (newUrl.trim()) {
      setUrls([...urls, newUrl]); // URL 목록에 추가
      setNewUrl(''); // 입력 필드 초기화
    }
  };

  // robots.txt 파일 확인 함수
  const checkRobotsTxt = async (url) => {
    try {
      const parsedUrl = new URL(url);
      const robotsUrl = `${parsedUrl.origin}/robots.txt`; // 사이트의 robots.txt 파일 경로
      const response = await axios.get(robotsUrl);
      const robotsTxt = response.data;

      // Disallow된 경로가 있는지 확인
      const disallowedPaths = robotsTxt
        .split('\n')
        .filter(line => line.startsWith('Disallow:'))
        .map(line => line.replace('Disallow:', '').trim());

      // 만약 크롤링하려는 경로가 Disallow된 경로에 포함되어 있으면 false 반환
      return disallowedPaths.every(path => !url.includes(path));
    } catch (error) {
      console.error('Error fetching robots.txt:', error);
      // robots.txt 파일을 못 찾는 경우 (404 등), 크롤링 허용으로 간주
      return true;
    }
  };

  // 크롤링 데이터 요청 및 키워드 비교 함수
  const fetchData = async (url, apiPath, index) => {
    setLoading(true);
    setError('');
    try {
      const canCrawl = await checkRobotsTxt(url); // robots.txt 확인

      if (!canCrawl) {
        setError(`해당 사이트(${url})는 robots.txt에 의해 크롤링이 허용되지 않습니다.`);
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:8080/api/${apiPath}`, {
        params: { url } // URL에 대한 데이터를 요청
      });

      const crawledData = response.data;

      // 크롤링된 데이터를 콘솔에 출력
      console.log(`사이트 ${index + 1} (${url})의 크롤링 데이터:`);
      console.log(crawledData);

      // 크롤링한 데이터에서 치료법 키워드 필터링
      const matchedKeywords = treatmentKeywords.filter(keyword =>
        crawledData.some(data => data.includes(keyword))
      );

      const newDataList = [...dataList];
      newDataList[index] = matchedKeywords; // 일치하는 키워드를 데이터로 저장
      setDataList(newDataList);
    } catch (error) {
      console.error('Error during crawling:', error);
      setError('크롤링 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="section">
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="사이트 URL 입력"
        />
        <button onClick={addUrl}>사이트 추가</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 오류 메시지 출력 */}

      {/* 추가된 URL들에 대한 섹션 */}
      {urls.map((url, index) => (
        <div key={index} className="section">
          <h2>사이트 {index + 1}: {url}</h2>
          <div className="button-group">
            <button onClick={() => fetchData(url, 'crawl-list1', index)}>방법 1</button>
            <button onClick={() => fetchData(url, 'crawl-list2', index)}>방법 2</button>
            <button onClick={() => fetchData(url, 'crawl-list3', index)}>방법 3</button>
          </div>
          {loading && <p>로딩 중...</p>}
          {dataList[index]?.length > 0 ? (
            <div>
              <h3>치료법 키워드 매칭 결과:</h3>
              <ul>
                {dataList[index].map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>일치하는 치료법이 없습니다.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Subjects;
