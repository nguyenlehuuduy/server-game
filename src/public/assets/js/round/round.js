
$(document).ready(function () {
    var NAME_LAYOUT = $("#DEFINENAMEPAGE").attr('layout');
    if (NAME_LAYOUT == 'ROUNDPAGE') {
        console.log(NAME_LAYOUT);
        getAllRound()
        function getAllRound() {
            $(".pre-loading").show()
            $.ajax({
                url: 'get-all-round',
                type: 'GET',
                dataType: "json",
                encode: true,
            }).done(function (data) {
                console.log('duy code', data)
                let html = '';
                data.reverse().map((round) => {
                    html += `  <tr>
                            <td class="border-bottom-0">
                              <h6 class="fw-semibold mb-0">`+ round.nameRound + `</h6> 
                              <a href="javascript:value(0)" data-id="`+ round._id + `" class="delete-round" style="color: red">Xóa </a>
                              <a href="javascript:value(0)" data-id="`+ round._id + `" class="update-round">Sửa</a>
                            </td>
                            <td class="border-bottom-0">
                              <h6 class="fw-semibold mb-1">`+ round.descriptionRound + `</h6>
                            </td>
                            <td class="border-bottom-0">
                              <p class="mb-0 fw-normal">`+ round.conditionWinning + `</p>
                            </td>
                            <td class="border-bottom-0">
                              <div class="d-flex align-items-center gap-2">
                                <span class="badge bg-primary rounded-3 fw-semibold">`+ round.conditionlevel + `</span>
                              </div>
                            </td>
                          </tr>`;

                    $(".body-round").html(html)
                })
            }).then((rs) => {
                $(".pre-loading").hide();
            }).then((rs) => {
                $(".delete-round").click(function () {
                    let dataId = $(this).attr('data-id')
                    Swal.fire({
                        title: 'Bạn có muốn xóa loại câu hỏi này không?',
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Xóa',
                        denyButtonText: `Không xóa`,
                        cancelButtonText: 'Hủy',
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            $(".pre-loading").show();
                            $.ajax({
                                url: 'delete-round/' + dataId + '',
                                type: 'DELETE',
                                dataType: "json",
                                encode: true,
                            }).done(function (data) {
                                console.log(data)
                                if (data == 'success') {
                                    Swal.fire('Đã xóa!', '', 'success')
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Ôi không !...',
                                        text: 'Có cái gì đó không ổn trong server!',
                                        footer: '<a href="">Tại sao tôi lại gặp vấn đề này?</a>'
                                    })
                                }
                            })
                        } else if (result.isDenied) {
                            Swal.fire('Những thay đổi không được lưu', '', 'info')
                        }
                    }).then((rs) => {
                        setTimeout(function () {
                            window.location.reload()
                        }, 2000)
                    })

                })
            }).then((rs) => {
                //request get detail  //request update
                $(".update-round").click(function () {
                    $(".alert-err").html("")
                    let dataId = $(this).attr('data-id')
                    $.ajax({
                        url: 'get-round/' + dataId + '',
                        type: 'GET',
                        dataType: "json",
                        encode: true,
                    }).done(function (data) {
                        $(".ud-name-round").val(data.obj.nameRound)
                        $(".up-des-round").val(data.obj.descriptionRound)
                        $(".up-conditionwin-round").val(data.obj.conditionWinning)
                        $(".up-conditionlevel-round").val(data.obj.conditionlevel)
                    })
                    $(".pre-loading").show();
                    $(".lo-update-round").slideDown()
                    $(".btn-update-round").click(function () {
                        $(".alert-err").html("")
                        let nameround = $(".ud-name-round").val()
                        let desround = $(".up-des-round").val()
                        let conditionwin = $(".up-conditionwin-round").val()
                        let conditionlevel = $(".up-conditionlevel-round").val()
                        if (nameround == "" || desround == "" || conditionwin == "" || conditionlevel == "") {
                            $(".alert-err").html('Some thing was null !')
                        } else {
                            $(".lo-update-round").slideUp()
                            let formData = new FormData()
                            formData = {
                                _id: dataId,
                                obj: {
                                    nameRound: nameround,
                                    descriptionRound: desround,
                                    conditionWinning: conditionwin,
                                    conditionlevel: conditionlevel,
                                }
                            }
                            //request update
                            $.ajax({
                                url: 'update-round',
                                type: 'PUT',
                                dataType: "json",
                                data: formData,
                                encode: true,
                            }).done(function (data) {
                                if (data.data == "success") {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Cập nhật thành công',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    $(".lo-update-round").slideUp()
                                }
                            }).then((rs) => {
                                setTimeout(function () { window.location.reload() }, 2000)

                                $(".ud-name-round").val("")
                                $(".up-des-round").val("")
                                $(".up-conditionwin-round").val("")
                                $(".up-conditionwin-level").val("")
                            })
                        }
                    })
                })
            })
        }
        //function close component in pre-layout

        closeComponent()
        function closeComponent() {
            $(".pre-loading").click(function () {
                $(this).hide()
                $(".lo-update-round").slideUp()
            })
        }

        addRound()
        function addRound() {
            $(".btn-add-round").click(function () {
                $(".pre-loading").show()
                let nameround = $(".add-name-round").val()
                let desround = $(".add-des-round").val()
                let conditionwin = $(".add-condition-win").val()
                let conditionlevel = $(".add-condition-level").val()

                if (nameround == "" || desround == "" || conditionwin == "" || conditionlevel == "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ôi không...',
                        text: 'Có một cái gì đó còn rỗng !',
                        footer: '<a href="">Tại sao tôi lại gặp vấn đề này?</a>'
                    })
                    $(".pre-loading").hide()
                }
                else {
                    let formData = new FormData()
                    formData = {
                        nameRound: nameround,
                        descriptionRound: desround,
                        conditionWinning: conditionwin,
                        conditionlevel: conditionlevel,
                    }
                    $.ajax({
                        url: 'add-new-round',
                        type: 'POST',
                        dataType: "json",
                        data: formData,
                        encode: true,
                    }).done(function (data) {
                        if (data.data == "success") {
                            window.scrollTo(0, 0);
                            Swal.fire({
                                position: 'top-start',
                                icon: 'success',
                                title: 'Thêm thành công',
                                showConfirmButton: false,
                                timer: 2000
                            })

                        }
                    }).then((rs) => {
                        getAllRound()
                        $(".add-name-round").val("")
                        $(".add-des-round").val("")
                        $(".add-condition-win").val("")
                        $(".add-condition-level").val("")
                    }).then((rs) => {
                        $(".pre-loading").hide()
                    })
                }
                console.log(rs)
            })
        }
    } else {
        console.log('nguu')
    }
})

