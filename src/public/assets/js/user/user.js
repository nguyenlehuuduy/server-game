$(document).ready(function () {
    var NAME_LAYOUT = $("#DEFINENAMEPAGE").attr('layout');
    if (NAME_LAYOUT == 'USERPAGE') {
        getAllUser()
        function getAllUser() {
            $(".pre-loading").show()
            $.ajax({
                url: 'all-user',
                type: 'GET',
                dataType: "json",
                encode: true,
            }).done(function (data) {
                let html = '';
                data.reverse().map((user) => {
                    html += `  <tr>
                        <td class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">`+ user.name + `</h6> 
                          <a href="javascript:value(0)" data-id="`+ user._id + `" class="delete-user" style="color: red">Xóa </a>
                          <a href="javascript:value(0)" data-id="`+ user._id + `" class="update-user">Sửa</a>
                        </td>
                        <td class="border-bottom-0">
                          <h6 class="fw-semibold mb-1">`+ user.username + `</h6>
                        </td>
                        <td class="border-bottom-0">
                          <p class="mb-0 fw-normal">`+ user.password + `</p>
                        </td>
                         <td class="border-bottom-0">
                          <p class="mb-0 fw-normal">`+ user.birth + `</p>
                        </td>
                         <td class="border-bottom-0">
                          <p class="mb-0 fw-normal">`+ user.sex + `</p>
                        </td>
                      </tr>`;

                    $(".body-user").html(html)
                })
            }).then((rs) => {
                $(".pre-loading").hide();
            }).then((rs) => {
                $(".delete-user").click(function () {
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
                            $.ajax({
                                url: 'delete-user/' + dataId + '',
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
                        getAllUser()
                    })

                })
            }).then((rs) => {
                //request get detail  //request update
                $(".update-user").click(function () {
                    $(".alert-err").html("")
                    let dataId = $(this).attr('data-id')
                    $.ajax({
                        url: 'get-user/' + dataId + '',
                        type: 'GET',
                        dataType: "json",
                        encode: true,
                    }).done(function (data) {
                        $(".up-name").val(data.obj.name)
                        $(".up-username").val(data.obj.username)
                        $(".up-password").val(data.obj.password)
                        $(".up-birth").val(data.obj.birth)
                        $(".up-sex").val(data.obj.sex)
                    })
                    $(".pre-loading").show();
                    $(".lo-update-user").slideDown()
                    $(".btn-update-user").click(function () {
                        $(".alert-err").html("")
                        let name = $(".up-name").val()
                        let username = $(".up-username").val()
                        let password = $(".up-password").val()
                        let birth = $(".up-birth").val()
                        let sex = $(".up-sex").val()
                        if (name == "" || username == "" || password == "" || birth == "" || sex == "") {
                            $(".alert-err").html('Có trường gì đó đang rỗng !')
                        } else {
                            $(".lo-update-user").slideUp()
                            let formData = new FormData()
                            formData = {
                                _id: dataId,
                                obj: {
                                    name: name,
                                    username: username,
                                    password: password,
                                    birth: birth,
                                    sex: sex,
                                }
                            }
                            //request update
                            $.ajax({
                                url: 'update-user',
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
                                }
                            }).then((rs) => {
                                setTimeout(function () {
                                    window.location.reload()
                                }, 2000)
                                $(".up-name").val("")
                                $(".up-username").val("")
                                $(".up-password").val("")
                                $(".up-birth").val("")
                                $(".up-sex").val("")
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
                $(".lo-update-user").slideUp()
            })
        }
        addUser()
        function addUser() {
            $(".btn-add-user").click(function () {
                $(".pre-loading").show()
                let name = $(".add-name").val()
                let username = $(".add-username").val()
                let password = $(".add-password").val()
                let birth = $(".add-birth").val()
                let sex = $(".add-sex").val()

                if (name == "" || username == "" || password == "" || birth == "" || sex == "") {
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
                        name: name,
                        username: username,
                        password: password,
                        birth: birth,
                        sex: sex,
                    }
                    $.ajax({
                        url: 'add-new-user',
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
                        getAllUser()
                        $(".add-name").val("")
                        $(".add-username").val("")
                        $(".add-password").val("")
                        $(".add-birth").val("")
                        $(".add-sex").val("")
                    }).then((rs) => {
                        $(".pre-loading").hide()
                    })
                }
                console.log(rs)
            })
        }
    }
})
