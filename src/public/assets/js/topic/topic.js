$(document).ready(function () {
    var NAME_LAYOUT = $("#DEFINENAMEPAGE").attr('layout');
    if (NAME_LAYOUT == 'TOPICPAGE') {
        //getAllTopic
        getAllTopic()
        function getAllTopic() {
            $(".pre-loading").show()
            $.ajax({
                url: 'get-all-topic',
                type: 'GET',
                dataType: "json",
                encode: true,
            }).done(function (data) {
                console.log(data)
                let html = ""
                data.reverse().map((topic) => {
                    html += `   <tr>
                                 <td class="border-bottom-0">
                                     <h6 class="fw-semibold mb-1">`+ topic.nameTopic + `</h6>
                                     <span class="fw-normal">`;
                    html += `
                     <br/>
                     <a href="javascript:value(0)" data-id="`+ topic._id + `" class="delete-topic" style="color: red">Xóa </a>
                     <a href="javascript:value(0)" data-id="`+ topic._id + `" class="edit-topic">Sửa</a>
                     </span>
                                 </td>
                                `;
                    html += `
                                 <td class="border-bottom-0">
                                     <h6 class="fw-semibold mb-0 fs-4"> 
                                         <span class="badge bg-danger rounded-3 fw-semibold">` + topic.descriptionTopic + `</span> 
                                     </h6>
                                 </td>
                                  <td class="border-bottom-0">
                                     <p class="mb-0 fw-normal">`;
                    if (topic.idRound) {
                        html += topic.idRound.nameRound
                    } else {
                        html += 'null'
                    }
                    html += `</p>
                                 </td>
                             </tr>`
                })
                $(".body-topic").html(html)
            }).then((rs) => {
                $(".pre-loading").hide();
            }).then((rs) => {
                $(".delete-topic").click(function () {

                    let dataId = $(this).attr('data-id');
                    Swal.fire({
                        title: 'Bạn có muốn xóa chủ đề này không?',
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
                                url: 'delete-topic/' + dataId + '',
                                type: 'DELETE',
                                dataType: "json",
                                encode: true,
                            }).done(function (data) {
                                if (data == "success") {
                                    Swal.fire('Xóa!', '', 'success')
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Ôi không...',
                                        text: 'Có gì đó không đúng ở server!',
                                        footer: '<a href="">Tại sao tôi lại gặp vấn đề này?</a>'
                                    })
                                }
                            })
                        } else if (result.isDenied) {
                            Swal.fire('Thay đổi không được lưu', '', 'info')
                        }
                    }).then((rs) => {
                        setTimeout(function () { window.location.reload() }, 2000)
                    })
                })
            }).then((rs) => {
                $(".edit-topic").click(function () {
                    let dataId = false;
                    $(".pre-loading").show();
                    $(".lo-update-topic").slideDown()
                    $(".alert-error-update-topic").html("")
                    dataId = $(this).attr('data-id')

                    $.ajax({
                        url: 'get-topic/' + dataId + '',
                        type: 'GET',
                        dataType: "json",
                        encode: true,
                    }).done(function (data) {
                        console.log(data)
                        $(".sl-ud-round").val(data.obj.idRound._id)
                        //EASY
                        $(".ud-name-topic").val(data.obj.nameTopic)
                        $(".ud-des-topic").val(data.obj.descriptionTopic)
                    })
                    $(".btn-update-topic").click(function () {
                        //no need validation
                        let upnameTopic = $(".ud-name-topic").val()
                        let uddesTopic = $(".ud-des-topic").val()
                        let upRound = $(".sl-ud-round").val()
                        if (upnameTopic == "" || uddesTopic == "" || upRound == "") {
                            $(".alert-error-update-topic").html('something is null !')
                        }
                        else {
                            $(".alert-error-update-topic").html("")
                            let formData = new FormData();
                            formData = {
                                _id: dataId,
                                obj: {
                                    nameTopic: upnameTopic,
                                    descriptionTopic: uddesTopic,
                                    idRound: upRound
                                }
                            }
                            $(".lo-update-topic").slideUp();
                            //request update
                            $.ajax({
                                url: 'update-topic',
                                type: 'PUT',
                                dataType: "json",
                                data: formData,
                                encode: true,
                            }).done(function (data) {
                                console.log(data)
                                if (data.data == 'success') {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Your work has been saved',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    setTimeout(function () { window.location.reload() }, 2000)
                                }
                            })
                        }
                    })

                })
            });
        }

        closeComponent()
        function closeComponent() {
            $(".pre-loading").click(function () {
                $(this).hide()
                $(".lo-update-topic").slideUp()
            })
        }


        // Add new topic
        addnewTopic()
        function addnewTopic() {
            $(".btn-add-topic").click(function () {
                $(".pre-loading").show()
                let nameTopic = $(".add-name-topic").val()
                let descriptionTopic = $(".add-des-topic").val()
                let idRound = $(".sl-round").val()
                if (nameTopic == "" || descriptionTopic == "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ôi không...',
                        text: 'Có một giá trị nào đó rỗng!',
                        footer: '<a href="">Tại sao tôi lại gặp vấn đề này?</a>'
                    })
                    $(".pre-loading").hide()
                }
                else {
                    let formData = new FormData()
                    formData = {
                        nameTopic: nameTopic,
                        descriptionTopic: descriptionTopic,
                        idRound: idRound,
                    }
                    $.ajax({
                        url: 'add-new-topic',
                        type: 'POST',
                        dataType: "json",
                        data: formData,
                        encode: true,
                    }).done(function (data) {
                        if (data.data == "success") {
                            Swal.fire({
                                position: 'top-start',
                                icon: 'success',
                                title: 'Thêm thành công',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }
                        console.log(formData)
                    }).then((rs) => {
                        getAllTopic()
                        $(".add-name-topic").val("")
                        $(".add-des-topic").val("")
                        $(".sl-round").val("")
                    })
                }
                console.log(rs)
            })
        }
        getAllRound()
        function getAllRound() {
            let html = "";
            $.ajax({
                url: 'get-all-round',
                type: 'GET',
                dataType: "json",
                encode: true,
            }).done(function (data) {
                data.reverse().map((round) => {
                    html += `<option value = '` + round._id + `'>` + round.nameRound + `</option>`
                })
                $(".sl-round").html(html);
                $(".sl-ud-round").html(html)
            })
        }
    }
})
