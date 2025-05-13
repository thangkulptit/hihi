export enum ViewMode {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  VIEW = 'VIEW'
}

export enum Status {
  CLIENT_REQUEST = 0, //Client mới request lên
  SUCCESS = 1, // Thành công
  WRONG_AMOUNT = 2, // Sâi mệnh giá
  FAILD = 3, // Thẻ sai
  PENDING = 99, // Đang xử lý
  REJECT = 100, // Từ chối
}

export const MapStatus = {
  [Status.CLIENT_REQUEST]: 'Vừa gửi',
  [Status.SUCCESS]: 'Thành công',
  [Status.WRONG_AMOUNT]: 'Sai mệnh giá',
  [Status.FAILD]: 'Thất bại',
  [Status.PENDING]: 'Chờ duyệt',
  [Status.REJECT]: 'Từ chối',
}