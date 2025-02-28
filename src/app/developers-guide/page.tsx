import Link from 'next/link';
import React from 'react';

const DevelopersGuidePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Developers Guide</h2>
        <p className="text-gray-600 mb-6">개발자를 위한 넥스트 기본 프로젝트를 살펴보세요.</p>
        <div className="flex justify-center gap-4">
          <Link href="/developers-guide/corp">
            <span className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition cursor-pointer">
              Corporate Guide
            </span>
          </Link>
          <Link href="/developers-guide/snippets">
            <span className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition cursor-pointer">
              Code Snippets
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DevelopersGuidePage;
