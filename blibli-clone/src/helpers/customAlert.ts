import Swal from "sweetalert2";

export const swalWithDaisyButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "ml-4 btn btn-error",
  },
  buttonsStyling: false,
});
