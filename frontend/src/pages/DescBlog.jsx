import React from 'react'
import DOMPurify from 'dompurify';


const DescBlog = ({ htmlContent }) => {
  const sanitizedContent = DOMPurify.sanitize(htmlContent);

  return (
    <div>
      <hr className='mb-4' />
      <p className='desc-box flex flex-col gap-3 text-wrap' dangerouslySetInnerHTML={{ __html: sanitizedContent }}> 

      </p>
      <hr className='mt-4' />
    </div>
  )
}

export default DescBlog