// components/PhotoUploadModal.js
import React, { useState } from 'react';
import axios from 'axios';

const PhotoUploadModal = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 파일 선택 시
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // 파일 업로드 시
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('파일을 선택하세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setUploading(true); // 업로딩 중 표시
      const response = await axios.post('http://211.216.177.2:12000/idcard/idmodels/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('파일 업로드 성공:', response.data);
      alert('파일 업로드 성공!');
      onUpload(selectedFile); // 파일 업로드 완료 후 상위 컴포넌트로 파일 정보 전달
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('파일 업로드 실패.');
    } finally {
      setUploading(false); // 업로딩 완료
      onClose(); // 모달 닫기
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-50"></div>
          <div className="bg-white p-8 rounded-lg shadow-lg relative z-10 max-w-3xl mx-auto w-[50vh] mx-auto h-[80vh] flex flex-col justify-center">
            <div className="text-center mb-auto mt-20">
              <h1 className="text-xl text-[#ae8686] mb-4">신분증 사진 업로드</h1>
              <h2 className="text-sm text-gray-500 mb-4">(타인의 신분증을 도용할시 3년 이하 징역 또는 3000만원 이하 벌금에 처할 수 있습니다.)</h2>
              <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>
            <div className="text-center">
              <form onSubmit={handleSubmit}>
                <div>
                  <input type="file" onChange={handleFileChange} style={{ display: 'block', marginBottom: '10px' }} />
                </div>
                <button type="submit" className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={uploading}>
                  {uploading ? '업로드 중...' : '업로드 완료'}
                </button>
              </form>
            </div>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoUploadModal;










// //componets/PhotoUploadModal
// import React, { useState } from 'react';
// import axios from 'axios';

// const PhotoUploadModal = ({ isOpen, onClose }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   // 파일 선택 시
//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   // 파일 업로드 시
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedFile) {
//       alert('파일을 선택하세요.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       setUploading(true); // 업로딩 중 표시
//       const response = await axios.post('http://211.216.177.2:12000/idcard/idmodels/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       console.log('파일 업로드 성공:', response.data);
//       alert('파일 업로드 성공!');
//     } catch (error) {
//       console.error('파일 업로드 성공:', error);
//       alert('파일 업로드 성공.');
//     } finally {
//       setUploading(false); // 업로딩 완료
//     }
//   };

//   return (
//     <>
//       {isOpen && (
//         <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
//           <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-50"></div>
//           <div className="bg-white p-8 rounded-lg shadow-lg relative z-10 max-w-3xl mx-auto w-[50vh] mx-auto h-[80vh] flex flex-col justify-center">
//             <div className="text-center mb-auto mt-20">
//               <h1 className="text-xl text-[#ae8686] mb-4">신분증 사진 업로드</h1>
//               <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
//             </div>
//             <div className="text-center">
//               <form onSubmit={handleSubmit}>
//                 <div>
//                   <input type="file" onChange={handleFileChange} style={{ display: 'block', marginBottom: '10px' }} />
//                 </div>
//                 <button type="submit" className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={uploading}>
//                   {uploading ? '업로드 중...' : '업로드 완료'}
//                 </button>
//               </form>
//             </div>
//             <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PhotoUploadModal;
