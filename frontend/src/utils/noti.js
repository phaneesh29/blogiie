import toast from 'react-hot-toast';

const sucessToast =(message) => {toast.success(message,{
    duration: 4000,
  position: 'top-center',
})}
const errorToast = (message)=>{toast.error(message,{
    duration: 4000,
  position: 'top-center',
})}

export {sucessToast,errorToast}