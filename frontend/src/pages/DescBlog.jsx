import React, { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';

const DescBlog = ({ htmlContent }) => {
  const sanitizedContent = DOMPurify.sanitize(htmlContent);
  const contentRef = useRef(null);

  useEffect(() => {
    const preElements = contentRef.current?.querySelectorAll("pre");
    preElements?.forEach(pre => {
      if (pre.querySelector(".copy-btn")) return;

      const copyBtn = document.createElement("button");
      copyBtn.innerText = "Copy";
      copyBtn.className = "copy-btn px-2 py-1 text-sm bg-gray-800 text-white rounded absolute top-2 right-2";

      copyBtn.onclick = () => {
        navigator.clipboard.writeText(pre.innerText).then(() => {
          copyBtn.innerText = "Copied!";
          setTimeout(() => (copyBtn.innerText = "Copy"), 2000);
        });
      };

      pre.style.position = "relative";
      pre.appendChild(copyBtn);
    });
  }, [htmlContent]);

  return (
    <div>
      <hr className='mb-4' />
      <div ref={contentRef} className='desc-box flex flex-col gap-3 text-wrap' dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
      <hr className='mt-4' />
    </div>
  );
};

export default DescBlog;