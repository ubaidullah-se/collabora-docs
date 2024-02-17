import Swal, { SweetAlertCustomClass, SweetAlertOptions } from "sweetalert2";

class SweetAlert {
  fire(options: SweetAlertOptions) {
    return Swal.fire({
      ...options,
      customClass: {
        actions: "flex-row-reverse",
        confirmButton: "!bg-orange-400 !shadow-none",
        cancelButton: "!bg-red-600",
        htmlContainer: "!text-[16px] !leading-[22px]",
        inputLabel: "w-full justify-start pl-8",
        ...(options.customClass as SweetAlertCustomClass),
      },
    });
  }
}

const swalService = new SweetAlert();
export default swalService;
