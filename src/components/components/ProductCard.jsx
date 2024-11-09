function ProductCard({ item, setEdit, setProductDeleteModal }) {
  const { id, name, quantity, price } = item;
  return (
    <div
      key={id}
      className="grid myGrid14 px-10 gap-x-3 w-full h-[70px] items-center border-b last:rounded-b-2xl bg-[#ffffff]"
    >
      <span className="col-span-3 line-clamp-1 text-[#282828] font-normal text-[12px]">
        {name}
      </span>
      <span className="col-span-3 line-clamp-1 text-[#282828] font-normal text-[12px]">
        {quantity || "---"}
      </span>
      <span className="col-span-3 line-clamp-1 text-[#282828] font-normal text-[12px]">
        {price}
      </span>
      <span className="col-span-3 line-clamp-1 text-[#282828] font-normal text-[12px]">
        {id}
      </span>
      <span className="col-span-2 flex text-[#282828] font-normal text-[12px] justify-end gap-x-4">
        <button
          onClick={() => {
            setEdit([true, id]);
            document.body.style.overflow = "hidden";
          }}
        >
          <img src="/images/edit.svg" alt="edit icon" />
        </button>
        <button
          onClick={() => {
            setProductDeleteModal([true, id]);
            document.body.style.overflow = "hidden";
          }}
        >
          <img src="/images/trash.svg" alt="delete icon" />
        </button>
      </span>
    </div>
  );
}

export default ProductCard;
