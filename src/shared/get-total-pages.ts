interface IGetTotalPages {
  total: number;
  pageSize: number;
}

function getTotalPages({ total, pageSize }: IGetTotalPages) {
  return total > 0 ? Math.ceil(total / pageSize) : 1;
}

export { getTotalPages };
