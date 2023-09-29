// DARTrealtime.js
// Authors: ChatGPT, Vincent392
// yes I used ai
// =========================

const apiUrl = 'https://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML';

fetch(apiUrl)
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');

    const trainNodes = xmlDoc.getElementsByTagName('objTrainPositions');
    const trainData = Array.from(trainNodes).map(trainNode => {
      const trainId = trainNode.getElementsByTagName('TrainCode')[0].textContent;
      const status = trainNode.getElementsByTagName('TrainStatus')[0].textContent;
      return { trainId, status };
    });

    const trainDataContainer = document.getElementById('trainDataContainer');
    const htmlOutput = trainData.map(train => `<p>Train ID: ${train.trainId}, Status: ${train.status}</p>`).join('');
    trainDataContainer.innerHTML = htmlOutput;
  })
  .catch(error => console.error('Error fetching data:', error));