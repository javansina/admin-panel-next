import { useEffect, useState } from "react";

import { redirect } from "next/navigation";
import AddProductModal from "@/components/components/modalComponents/AddProductModal";
import DeleteProductModal from "@/components/components/modalComponents/DeleteProductModal";
import EditProductModal from "@/components/components/modalComponents/EditProductModal";
import ProductCard from "@/components/components/ProductCard";
import { useGetAllProducts } from "@/services/queries";
import { getCookie } from "@/utils/cookie";
import { useRouter } from "next/router";

function ProductsPage() {
  const { push } = useRouter();
  const token = getCookie("token");
  console.log(token);

  useEffect(() => {
    if (!token) {
      push("/login");
    }
  }, [token]);

  const [addModal, setAddModal] = useState(false);
  const [productDeleteModal, setProductDeleteModal] = useState([false, null]);
  const [edit, setEdit] = useState([false, ""]);
  const [showMessage, setShowMessage] = useState("");
  const [search, setSearch] = useState([]);
  const [page, setPage] = useState(1);
  const { data } = useGetAllProducts(page);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    const totalItems = data?.data.totalProducts;
    const totalPages = Math.ceil(totalItems / 10);
    const paginationNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationNumbers.push(i);
    }
    setPagination(paginationNumbers);
  }, [data]);

  const searchHandler = (e) => {
    setShowMessage("");
    const result = data.data.data.filter((item) =>
      item.name.includes(e.target.value.trim())
    );
    if (result.length > 0) {
      setSearch(result);
    } else {
      setShowMessage("کالایی با این اسم پیدا نشد!");
    }
  };

  return (
    <>
      {addModal && <AddProductModal setAddModal={setAddModal} />}
      {edit[0] && <EditProductModal setEdit={setEdit} edit={edit} />}
      {productDeleteModal[0] && (
        <DeleteProductModal
          productDeleteModal={productDeleteModal}
          setProductDeleteModal={setProductDeleteModal}
        />
      )}
      <div className="flex mx-auto relative justify-center items-center rounded-2xl w-[1145px] h-[68px] mt-7 border  bg-[#ffffff]">
        <span className="absolute right-5">
          <img
            src="/images/search-normal.svg"
            className="size-6"
            alt="search icon"
          />
        </span>
        <input
          type="text"
          placeholder="جستجوی کالا"
          onChange={searchHandler}
          className="pr-14 w-full placeholder:text-[#00000099] bg-inherit outline-none"
        />
        <div className="flex border-r border-[#E4E4E4] mr-5 px-5 gap-x-5">
          <img
            src="/images/Felix-Vogel-4.svg"
            className="rounded-full"
            alt=""
          />
          <div className="flex flex-col text-right w-[129px]">
            <span className="text-[#282828]">میلاد عظمی</span>
            <span className="text-[#282828] font-light">مدیر</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-[1140px] mt-11 mx-auto">
        <span className="flex gap-x-2">
          <img
            src="images/setting-3.svg"
            className="size-8 mt-1.5"
            alt="setting-icon"
          />
          <span className="font-normal min-w-fit text-[24px] text-[#282828]">
            مدیریت کالا
          </span>
        </span>
        <button
          onClick={() => {
            setAddModal(true);
            document.body.style.overflow = "hidden";
          }}
          className="bg-[#55A3F0] rounded-xl text-[#ffffff] px-3 tracking-wider h-11 pb-1"
        >
          افزودن محصول
        </button>
      </div>
      <div className="w-[1140px] mx-auto mt-3 border rounded-2xl mb-8">
        <div className="grid myGrid14 px-10 w-full rounded-t-2xl h-[70px] items-center bg-[#F2F2F2]">
          <span className="col-span-3 text-[#282828] font-medium text-[14px]">
            نام کالا
          </span>
          <span className="col-span-3 text-[#282828] font-medium text-[14px]">
            موجودی
          </span>
          <span className="col-span-3 text-[#282828] font-medium text-[14px]">
            قیمت
          </span>
          <span className="col-span-5 text-[#282828] font-medium text-[14px]">
            شناسه کالا
          </span>
        </div>
        {data?.data.data.length ? (
          search.length > 0 ? (
            showMessage.length > 0 ? (
              <div className="grid myGrid14 px-10 w-full h-[70px] items-center last:rounded-b-2xl bg-[#ffffff]">
                <span className="col-span-full text-center">{showMessage}</span>
              </div>
            ) : (
              search.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  setEdit={setEdit}
                  setProductDeleteModal={setProductDeleteModal}
                />
              ))
            )
          ) : (
            data?.data.data.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                setEdit={setEdit}
                setProductDeleteModal={setProductDeleteModal}
              />
            ))
          )
        ) : (
          <div className="grid myGrid14 px-10 w-full h-[70px] items-center last:rounded-b-2xl bg-[#ffffff]">
            <span className="col-span-full text-center">{showMessage}</span>
          </div>
        )}
      </div>
      <div className="w-full flex mb-5">
        <div className="w-fit mx-auto flex justify-between gap-x-3">
          {pagination.length > 0 &&
            pagination.map((i) => (
              <span
                key={i}
                onClick={() => setPage(i)}
                className={`w-8 h-8 cursor-pointer font-bold ${
                  page === i ? "pageNumAction" : "pageNum"
                }`}
              >
                {i}
              </span>
            ))}
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
