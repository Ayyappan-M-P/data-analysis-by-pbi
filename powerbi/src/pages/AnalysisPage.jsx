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

const AnalysisPage = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAnalyzeDataset = async () => {
    if (!file) return alert('Please upload a dataset first.');

    setIsLoading(true);

    const formData = new FormData();
    formData.append('dataset', file);

    // Assuming your backend has an endpoint for handling file uploads and analysis
    const response = await fetch('http://localhost:3000/api/analyze-dataset', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // Handle the successful analysis (e.g., redirect to report or dashboard page)
      alert('Dataset analyzed successfully!');
    } else {
      alert('Failed to analyze dataset.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h2>Upload and Analyze Dataset</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleAnalyzeDataset} disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Analyze Dataset'}
      </button>
    </div>
  );
};

export default AnalysisPage;
