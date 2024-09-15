// import React, { useState } from 'react';
// import { Upload, Button, message, Progress, List } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import './Analysis.css';


// const { Dragger } = Upload;

// const AnalysisPage = () => {
//   const [fileList, setFileList] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const props = {
//     onRemove: file => {
//       setFileList(prevFileList => {
//         const index = prevFileList.indexOf(file);
//         const newFileList = prevFileList.slice();
//         newFileList.splice(index, 1);
//         return newFileList;
//       });
//     },
//     beforeUpload: file => {
//       setFileList(prevFileList => [...prevFileList, file]);
//       return false;
//     },
//     fileList,
//   };

//   const handleUpload = () => {
//     setUploading(true);
//     setTimeout(() => {
//       setUploading(false);
//       message.success('File uploaded successfully');
//     }, 2000);
//   };

//   return (
//     <div className="analysis-page">
//       <h2>Data Analysis</h2>
//       <div className="upload-section">
//         <Dragger {...props} className="upload-dragger">
//           <p className="ant-upload-drag-icon">
//             <UploadOutlined />
//           </p>
//           <p className="ant-upload-text">Drag and drop files here or click to upload</p>
//         </Dragger>
//         <Button
//           type="primary"
//           onClick={handleUpload}
//           disabled={fileList.length === 0}
//           loading={uploading}
//           style={{ marginTop: '10px' }}
//         >
//           {uploading ? 'Uploading' : 'Start Upload'}
//         </Button>
//       </div>
//       <List
//         className="upload-list"
//         itemLayout="horizontal"
//         dataSource={fileList}
//         renderItem={item => (
//           <List.Item>
//             <List.Item.Meta
//               title={item.name}
//               description={`Size: ${(item.size / 1024 / 1024).toFixed(2)} MB`}
//             />
//             <Progress percent={uploading ? 100 : 0} />
//           </List.Item>
          
//         )}
//       />
//     </div>
//   );
// };

// export default AnalysisPage;


// import React, { useState } from 'react';
// import { Upload, Button, message, Progress, List } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

// const { Dragger } = Upload;

// const AnalysisPage = () => {
//   const [fileList, setFileList] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const navigate = useNavigate();

//   const props = {
//     onRemove: file => {
//       setFileList(prevFileList => {
//         const index = prevFileList.indexOf(file);
//         const newFileList = prevFileList.slice();
//         newFileList.splice(index, 1);
//         return newFileList;
//       });
//     },
//     beforeUpload: file => {
//       setFileList(prevFileList => [...prevFileList, file]);
//       return false;
//     },
//     fileList,
//   };

//   const handleUpload = () => {
//     setUploading(true);
//     setTimeout(() => {
//       setUploading(false);
//       message.success('File uploaded successfully');
//       navigate('/report-display'); // Navigate to the ReportDisplay page
//     }, 2000);
//   };

//   return (
//     <div>
//       <h2>Data Analysis</h2>
//       <div>
//         <Dragger {...props}>
//           <p className="ant-upload-drag-icon">
//             <UploadOutlined />
//           </p>
//           <p className="ant-upload-text">Drag and drop files here or click to upload</p>
//         </Dragger>
//         <Button
//           type="primary"
//           onClick={handleUpload}
//           disabled={fileList.length === 0}
//           loading={uploading}
//           style={{ marginTop: '10px' }}
//         >
//           {uploading ? 'Uploading' : 'Start Upload'}
//         </Button>
//       </div>
//       <List
//         itemLayout="horizontal"
//         dataSource={fileList}
//         renderItem={item => (
//           <List.Item>
//             <List.Item.Meta
//               title={item.name}
//               description={`Size: ${(item.size / 1024 / 1024).toFixed(2)} MB`}
//             />
//             <Progress percent={uploading ? 100 : 0} />
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

// export default AnalysisPage;


// UploadDataset.js
// src/pages/AnalysisPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { PowerBIEmbed } from 'powerbi-client-react'; // Power BI embed component

const AnalysisPage = () => {
  const [embedUrl, setEmbedUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyzeDataset = async (file) => {
    const formData = new FormData();
    formData.append('dataset', file);

    try {
      const response = await axios.post('http://localhost:3000/api/analyze-dataset', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Get embed details from the response
      const { embedUrl, accessToken, embedReportId } = response.data;
      setEmbedUrl(embedUrl);
      setAccessToken(accessToken);
      setReportId(embedReportId);
    } catch (error) {
      console.error('Failed to analyze dataset:', error);
      setError('Failed to analyze dataset');
    }
  };

  return (
    <div>
      <h2>Upload and Analyze Dataset</h2>
      <input type="file" onChange={(e) => handleAnalyzeDataset(e.target.files[0])} />
      {error && <p>{error}</p>}

      {embedUrl && accessToken && (
        <div>
          <h3>Analysis Report</h3>
          <PowerBIEmbed
            embedConfig={{
              type: 'report',
              id: reportId,
              embedUrl: embedUrl,
              accessToken: accessToken,
              tokenType: models.TokenType.Aad,
              settings: {
                panes: {
                  filters: {
                    visible: false,
                  },
                },
              },
            }}
            cssClassName="powerbi-report"
          />
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
