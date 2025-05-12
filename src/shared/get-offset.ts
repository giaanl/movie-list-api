interface IGetOffset {
  page: number;
  pageSize: number;
}

function getOffset({ page, pageSize }: IGetOffset) {
  return pageSize * (page - 1);
}

export { getOffset };
