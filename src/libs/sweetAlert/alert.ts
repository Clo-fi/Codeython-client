import Swal, { SweetAlertOptions } from "sweetalert2";

export const CustomAlert = {
  fire: ({ ...options }: SweetAlertOptions) => {
    return Swal.fire({
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        icon: "swal-icon",
      },
      buttonsStyling: false,
      confirmButtonText: "확인",
      ...options,
    });
  },
  mixin: ({ ...options }: SweetAlertOptions) => {
    Swal.mixin({ ...options });
  },
};
