import { useEffect, useState } from "react";
import { useGetProductById } from "@/services/queries";
import { usePutProduct } from "@/services/mutations";

function EditProductModal({ edit, setEdit }) {
  const { data, isLoading, isError } = useGetProductById(edit[1]);

  const { mutate } = usePutProduct(edit[1]);
  const [editProduct, setEditProduct] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (!isError && !isLoading) {
      setEditProduct(data?.data);
    }
  }, [data]);

  const changeHandler = (e) => {
    setEditProduct((product) => ({
      ...product,
      [e.target.name]: e.target.value,
    }));
  };

  const editProductHandler = () => {
    mutate(editProduct, {
      onSuccess: (data) => console.log(data),
      onError: (err) => console.log(err),
    });
    setEdit([false, null]);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="absolute w-full  h-screen bg-black/30 z-30 flex justify-center items-center">
      <div className="flex flex-col w-[460px] h-[448px] rounded-3xl bg-[#ffffff] px-10 py-6">
        <h1 className="text-center font-medium text-[#282828] text-[20px] mb-7">
          ویرایش اطلاعات
        </h1>
        <label className="font-medium text-[#282828] text-[14px] mb-2">
          نام کالا
        </label>
        <input
          onChange={changeHandler}
          name="name"
          value={editProduct.name}
          className="h-[42px] bg-[#f2f2f2] rounded-lg mb-4 placeholder:font-light text-[14px] text-[#8d8d8d] pr-2"
          placeholder="نام کالا"
          type="text"
        />
        <label className="font-medium text-[#282828] text-[14px] mb-2">
          تعداد موجودی
        </label>
        <input
          onChange={changeHandler}
          name="quantity"
          value={editProduct.quantity}
          className="h-[42px] bg-[#f2f2f2] rounded-lg mb-4 placeholder:font-light text-[14px] text-[#8d8d8d] pr-2"
          placeholder="تعداد"
          type="number"
        />
        <label className="font-medium text-[#282828] text-[14px] mb-2">
          قیمت
        </label>
        <input
          onChange={changeHandler}
          name="price"
          value={editProduct.price}
          className="h-[42px] bg-[#f2f2f2] rounded-lg placeholder:font-light text-[14px] text-[#8d8d8d] pr-2"
          placeholder="قیمت"
          type="number"
        />
        <div className="flex justify-between gap-x-5 mt-10">
          <button
            onClick={editProductHandler}
            className="bg-[#55A3F0] w-full h-10 rounded-xl text-[14px] font-medium text-[#ffffff] cursor-pointer hover:bg-[#6eb0f3] transition-colors delay-75"
          >
            ثبت اطلاعات جدید
          </button>
          <button
            onClick={() => {
              setEdit([false, null]);
              document.body.style.overflow = "auto";
            }}
            className="bg-[#DFDFDF] w-full h-10 rounded-xl text-[14px] font-medium text-[#282828]/80 cursor-pointer hover:bg-[#ececec] transition-colors delay-75"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProductModal;
