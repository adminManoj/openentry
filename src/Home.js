import React, { useEffect, useState } from "react";
import he from 'he'

const Home = () => {
  const baseUrl = "https://kaamkaenginner.oneentry.cloud/api";
  const [pagesData, setPagesData] = useState([]);
  const [pagesContent, setPagesContent] = useState('');


  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2FhbWthZW5naW5uZXIiLCJzZXJpYWxOdW1iZXIiOjEsImlhdCI6MTcxNjU3NTEwMiwiZXhwIjoxNzQ4MTExMDM0fQ.HT8CjkCf7pjR0VfvPP5vTzJcrEdyr0GPaFuXKlO0pFM";

  useEffect(() => {
    getData();
  }, []);

  const params = new URLSearchParams({
    langCode: "en_US",
  });

  const getData = async () => {    

    const response = await fetch(`${baseUrl}/content/pages?${params}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-app-token": token,
      },
    });

    const status = response.status;
    const data = await response.json();

    const extractedData = data.map((item) => {
      const { id, pageUrl, localizeInfos } = item;
      const { title, menuTitle, htmlContent } = localizeInfos.en_US;

      return { id, pageUrl, title, menuTitle, htmlContent };
    });

    setPagesData(extractedData);
    // console.log(data);
    // console.log(status);
  };

  const handleClick = async (id) => {
    //alert(id)
    const response = await fetch(`${baseUrl}/content/pages/${id}?${params}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'x-app-token': token,
      },
    })
  
    const status = response.status
    const data = await response.json();
    setPagesContent(data.localizeInfos.en_US.htmlContent);  
    console.log(data)
    console.log(status)
  }

  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        {pagesData.map((item) => {
          return (
            <li style={{ float: "left", width: "150px" }}>
              <a href={item.id}>{item.title}</a>
            </li>
          );
        })}
      </ul>
      <br></br>
      <ul style={{ listStyleType: "none" }}>
        {pagesData.map((item) => {
          return (
            <button onClick={() => handleClick(item.id)} style={{ float: "left", width: "150px", margin:"10px" }}>
              {item.title}
            </button>
          );
        })}
      </ul>
      <br></br>
      <div dangerouslySetInnerHTML={{ __html:  he.decode(pagesContent) }} />
    </div>
  );
};

export default Home;
