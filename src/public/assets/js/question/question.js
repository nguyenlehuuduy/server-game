$(document).ready(function () {
    var NAME_LAYOUT = $("#DEFINENAMEPAGE").attr('layout');
    if (NAME_LAYOUT == 'HOMEPAGE') {
        console.log(NAME_LAYOUT)
        //fucntion get all question and delete/update question
        getAllQuestion()
        function getAllQuestion() {
            $(".pre-loading").show()
            $.ajax({
                url: 'get-all-question',
                type: 'GET',
                dataType: "json",
                encode: true,
            }).done(function (data) {
                let html = ""
                data.reverse().map((question) => {
                    html += `   <tr>
                            <td class="border-bottom-0">
                                <h6 class="fw-semibold mb-1">`+ question.content.decription + `</h6>
                                <span class="fw-normal">`;
                    if (question.idTopic) {
                        html += question.idTopic.nameTopic
                    } else {
                        html += 'null'
                    }
                    html += `
                <br/>
                <a href="javascript:value(0)" data-id="`+ question._id + `" class="delete-question" style="color: red">Xóa </a>
                <a href="javascript:value(0)" data-id="`+ question._id + `" class="edit-question">Sửa</a>
                </span>
                            </td>
                            <td class="border-bottom-0">
                                <p class="mb-0 fw-normal">`;
                    if (question.idType) {
                        html += question.idType.nameType
                    } else {
                        html += 'null'
                    }
                    html += `</p>
                            </td>
                            <td class="border-bottom-0">
                                <div class="d-flex align-items-center gap-2" style ="width: 300px;  overflow-x: scroll;   padding-bottom: 25px">
                                   `;

                    (question.option).map((choice) => {
                        html += ` <span class="badge bg-primary rounded-3 fw-semibold">` + choice + `</span>`
                    });
                    html += ` </div> </td>`;


                    html += `
                    <td class="border-bottom-0">
                        <div class="d-flex align-items-center gap-2" style ="width: 300px;  overflow-x: scroll; padding-bottom: 25px">
                           `;

                    (question.answer).map((answer) => {
                        html += ` <span class="badge bg-warning rounded-3 fw-semibold">` + answer + `</span>`
                    });
                    html += ` </div> </td>`;
                    // html += `<td>  <div class="d-flex align-items-center gap-2" style ="width: 300px;  overflow-x: scroll;">`;
                    // (question.answer).map((answer) => {
                    //     html += `<span class="badge bg-danger rounded-3 fw-semibold">` + answer + `</span> </div>
                    // </td>`;
                    // })
                    html += '</tr>'

                })
                $(".body-question").html(html)
            }).then((rs) => {
                $(".pre-loading").hide();
            }).then((rs) => {
                $(".delete-question").click(function () {
                    let dataId = $(this).attr('data-id');
                    Swal.fire({
                        title: 'Bạn có muốn xóa câu hỏi này không?',
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
                                url: 'delete-question/' + dataId + '',
                                type: 'DELETE',
                                dataType: "json",
                                encode: true,
                            }).done(function (data) {
                                if (data == "success") {
                                    Swal.fire('Xóa!', '', 'success')
                                    setTimeout(function () {
                                        window.location.reload()
                                    }, 2000)
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
                    })
                })
            }).then((rs) => {
                $(".edit-question").click(function () {
                    let dataId = false;
                    $(".pre-loading").show();
                    $(".lo-update-question").slideDown()
                    $(".alert-error-update-question").html("")
                    dataId = $(this).attr('data-id')

                    $.ajax({
                        url: 'get-question/' + dataId + '',
                        type: 'GET',
                        dataType: "json",
                        encode: true,
                    }).done(function (data) {
                        //handle 

                        //NOTE
                        //id topic chưa có làm
                        // $(".sl-up-topic").val(data.idTopic)
                        //id round chưa có làm
                        //$(".sl-ud-round").val(data.idRound)
                        $("#ud-round option[value=" + data.obj.idRound._id + "]").attr('selected', 'selected');
                        $("#sl-ud-type-question option[value=" + data.obj.idType._id + "]").attr('selected', 'selected');

                        let str_option_answer = "";
                        (data.obj.option).map((ans, index) => {
                            if (index != data.obj.option.length - 1) {
                                (data.obj.answer).map((item) => {
                                    if (item == ans) {
                                        str_option_answer += ('*' + ans + ',')
                                    } else {
                                        str_option_answer += (ans + ',')
                                    }
                                })
                            } else {
                                (data.obj.answer).map((item) => {
                                    if (item == ans) {
                                        str_option_answer += ('*' + ans)
                                    } else {
                                        str_option_answer += ans
                                    }
                                })
                            }
                        })
                        $(".ud-awswer").val(str_option_answer)

                        //EASY
                        $(".ud-src-image").val(data.obj.content.imagePath)
                        $(".ud-content-question").val(data.obj.content.decription)
                    })

                    $(".btn-update-question").click(function () {
                        //no need validation
                        let udImageSource = $(".ud-src-image").val()
                        let udIdRound = $(".ud-round").val()
                        let upIdTopic = $(".ud-topic").val()

                        //validation
                        let udContentQuestion = $(".ud-content-question").val()
                        let udAnswer = $(".ud-awswer").val()
                        let udTypeQuestion = $(".sl-ud-type-question").val()
                        let rs_validate = defineRoleQuestion(udAnswer, udTypeQuestion)
                        let ud_l_answer = rs_validate.trueAnwer
                        let ud_l_option = rs_validate.listOption
                        if (udContentQuestion == "" || udAnswer == "" || udTypeQuestion == "") {
                            $(".alert-error-update-question").html('Có gì đó đang trống !')
                        }
                        else if (rs_validate == "undefindTypeQuestion") {
                            $(".alert-error-update-question").html('Loại câu hỏi này chưa được định nghĩa !')
                        }
                        else if (rs_validate == "underfindAnwser") {
                            $(".alert-error-update-question").html('Chưa tìm thấy câu trả lời đúng!')
                        }
                        else {
                            $(".lo-update-question").slideUp();
                            $(".alert-error-update-question").html("")
                            let formData = new FormData();
                            formData = {
                                _id: dataId,
                                obj: {
                                    'content.decription': udContentQuestion,
                                    'content.imagePath': udImageSource,
                                    answer: ud_l_answer,
                                    option: ud_l_option,
                                    idType: udTypeQuestion,
                                    //NOTE BUG
                                    idTopic: upIdTopic,
                                    idRound: udIdRound
                                }
                            }
                            //request update
                            $.ajax({
                                url: 'update-question',
                                type: 'PUT',
                                dataType: "json",
                                data: formData,
                                encode: true,
                            }).done(function (data) {
                                if (data.data == 'success') {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Cập nhật câu hỏi thành công !',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    setTimeout(function () {
                                        window.location.reload()
                                    }, 2000)
                                }
                            })
                        }
                    })

                })
            });
        }

        //fucntion get all type question and delete/update type question
        getAllTypeQuestion()
        function getAllTypeQuestion() {
            $(".pre-loading").show()
            $.ajax({
                url: 'all-type-questions',
                type: 'GET',
                dataType: "json",
                encode: true,
            }).done(function (data) {
                let html = '';
                let html_sl_type = '';
                data.reverse().map((type) => {
                    html_sl_type += `<option value = ` + type._id + `>` + type.nameType + `</option>`
                    html += `   <li class="timeline-item d-flex position-relative overflow-hidden">
                    <div class="timeline-time text-dark flex-shrink-0 text-end " style= " overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                width: 120px; ">`+ type.nameType + ` 
                                </br>
                                <a href="javascript:value(0)" class="delete-type-question" data-id='`+ type._id + `' style="color: red">Xóa <a>
                                <a href="javascript:value(0)" class="update-type-question" data-id='`+ type._id + `'>Sửa<a>
                                </div>
                    <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                        <span class="timeline-badge border-2 border border-primary flex-shrink-0 my-8"></span>
                        <span class="timeline-badge-border d-block flex-shrink-0"></span>
                    </div>
                    <div class="timeline-desc fs-3 text-dark mt-n1">` + type.descriptionType + `</div>
                </li>`
                })
                $(".l-all-type-question").html(html)
                $(".sl-type-question").html(html_sl_type)
                $(".sl-ud-type-question").html(html_sl_type)
            }).then((rs) => {
                $(".pre-loading").hide()
            }).then((rs) => {
                $(".delete-type-question").click(function () {
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
                                url: 'delete-type-questions/' + dataId + '',
                                type: 'DELETE',
                                dataType: "json",
                                encode: true,
                            }).done(function (data) {
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
                        getAllTypeQuestion()
                    })

                })
            }).then((rs) => {
                //request get detail  //request update
                $(".update-type-question").click(function () {
                    $(".alert-err").html("")
                    let dataId = $(this).attr('data-id')
                    $.ajax({
                        url: 'get-type-questions/' + dataId + '',
                        type: 'GET',
                        dataType: "json",
                        encode: true,
                    }).done(function (data) {
                        $(".ud-name-type").val(data.obj.nameType)
                        $(".up-role-answer").val(data.obj.roleOfAnswer)
                        $(".up-descript-answer").val(data.obj.descriptionType)
                    })

                    $(".pre-loading").show();
                    $(".lo-update-type-question").slideDown()
                    $(".btn-update-type-question").click(function () {

                        $(".alert-err").html("")
                        let udNameType = $(".ud-name-type").val()
                        let upRole = $(".up-role-answer").val()
                        let upDesType = $(".up-descript-answer").val()
                        if (udNameType == "" || upRole == "") {
                            $(".alert-err").html('Cớ gì đó đang rỗng  !')
                        } else {
                            $(".lo-update-type-question").slideUp()
                            let formData = new FormData()
                            formData = {
                                _id: dataId,
                                obj: {
                                    nameType: udNameType,
                                    descriptionType: upDesType,
                                    roleOfAnswer: upRole
                                }
                            }
                            //request update
                            $.ajax({
                                url: 'update-type-questions',
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
                                $(".ud-name-type").val("")
                                $(".up-role-answer").val("")
                                $(".up-descript-answer").val("")
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
                $(".lo-update-type-question").slideUp()
                $(".lo-update-question").slideUp()
            })
        }
        //function add a type question 
        addATypeQuestion()
        function addATypeQuestion() {
            $(".btn-add-type-question").click(function () {
                $(".pre-loading").show()
                let desAnswer = $(".descript-answer").val();
                let roleAnswer = $(".role-answer").val();
                let nameType = $(".name-type").val();
                //validation
                if (nameType == "" || roleAnswer == "") {
                    $(".pre-loading").hide()
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Có cái gì đó rỗng!',
                        footer: '<a href="">Tại sao tôi lại gặp vấn đề này?</a>'
                    })
                } else {
                    let formData = new FormData();
                    formData = {
                        nameType: nameType,
                        descriptionType: desAnswer,
                        roleOfAnswer: roleAnswer
                    }
                    //request api
                    $.ajax({
                        url: 'add-new-type-questions',
                        type: 'POST',
                        dataType: "json",
                        data: formData,
                        encode: true,
                    }).done(function (data) {
                        if (data.data == "success") {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Thêm thành công',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Ôi không!...',
                                text: 'Có cái gì đó không ổn trên server!',
                                footer: '<a href="">Tại sao tôi lại gặp vấn đề này?</a>'
                            })
                        }

                    }).then((rs) => {
                        getAllTypeQuestion()
                        $(".descript-answer").val("");
                        $(".role-answer").val("");
                        $(".name-type").val("");
                    }).then((rs) => {
                        window.scrollTo(0, 0);
                    }).then((rs) => {
                        $(".pre-loading").hide()
                    })
                }
            })
        }

        //fuction add a question
        addAQuestion()
        function addAQuestion() {
            $(".btn-add-question").click(function () {
                $(".pre-loading").show()
                let answer = $(".awswer").val()
                let question = $(".content-question").val()
                let typeQuestion = $(".sl-type-question").val()
                //dont need to validation
                let round = $(".round-questions").val();
                let srcImage = $(".src-image").val()
                let topic = $(".topic-questions").val()

                if (answer == "" || question == "" || typeQuestion == "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ôi không...',
                        text: 'Có thứ gì đó rỗng!',
                        footer: '<a href="">Tại sao tôi lại gặp vấn đề này?</a>'
                    })
                    $(".pre-loading").hide()
                } else {
                    //hash string to array answer
                    let rs = defineRoleQuestion(answer, typeQuestion)
                    let l_answer = rs.trueAnwer
                    let l_option = rs.listOption
                    if (rs == "undefindTypeQuestion") {
                        $(".pre-loading").hide()
                        if (rs == "undefindTypeQuestion") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Ôi không...',
                                text: 'Loại câu hỏi chưa được định nghĩa ! ',
                                footer: '<a href="">Tại sao tôi lại gặp vấn đề này?</a>'
                            })
                        }
                    } else if (rs == "underfindAnwser") {
                        $(".pre-loading").hide()
                        Swal.fire({
                            icon: 'error',
                            title: 'Ôi không...',
                            text: 'Câu trả lời chưa được định nghĩa ! ',
                            footer: '<a href="">Tại sao tôi lại gặp vấn đề này?</a>'
                        })
                    } else if (rs == false) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ôi không...',
                            text: 'Cấu trúc sai!',
                            footer: '<a href="">Tại sao tôi lại gặp vấn đề này?</a>'
                        })
                    }
                    else {
                        let formData = new FormData()
                        formData = {
                            decription: question,
                            imagePath: srcImage,
                            answer: l_answer,
                            st_option: l_option,
                            idType: typeQuestion,
                            idTopic: topic,
                            idRound: round
                        }
                        $.ajax({
                            url: 'add-new-question',
                            type: 'POST',
                            dataType: "json",
                            data: formData,
                            encode: true,
                        }).done(function (data) {
                            if (data.data == "success") {
                                Swal.fire({
                                    position: 'top-start',
                                    icon: 'success',
                                    title: 'Thêm câu hỏi thành công',
                                    showConfirmButton: false,
                                    timer: 2000
                                })

                            }
                        }).then((rs) => {
                            getAllQuestion()
                            $(".awswer").val("")
                            $(".content-question").val("")
                            $(".sl-type-question").val("")
                            //dont need to validation
                            $(".src-image").val("")
                            $(".topic-questions").val("")
                        }).then((rs) => {
                            window.scrollTo(0, 0);
                            $(".pre-loading").hide()
                        })
                    }
                }
            })
        }
        //define role in question
        function defineRoleQuestion(str, type) {
            let list_option = [];
            let true_anwer = []
            //trac nghiem
            if (type == '653d24ea841997afabb6baeb') {
                if (!str.split(",").length) {
                    return false
                } else {
                    str.split(",").map((item) => {
                        if (item.split("*").length == 2) {
                            list_option.push(item.split("*")[1])
                            true_anwer.push(item.split("*")[1])
                        } else {
                            list_option.push(item)
                        }
                    })
                    if (list_option.length == 0 || true_anwer == 0) {
                        return 'underfindAnwser'
                    }
                    return {
                        listOption: list_option,
                        trueAnwer: true_anwer
                    }
                }
            }
            //câu đồng nghĩa
            else if (type == '655cc4b3a0f79c483a11aeed') {
                if (str.split("|").length < 2) {
                    //ko tồn tại trả lời
                    return false
                } else {
                    console.log('câu đồng nghĩa')
                    str.split("|").map((item) => {
                        if (item.split(",").length > 1) {
                            true_anwer.push(item)
                        }
                        item.split(",").map((it) => {
                            list_option.push(it)
                        })
                    })
                    if (list_option.length == 0 || true_anwer.length == 0) {
                        return 'underfindAnwser'
                    }
                    return {
                        listOption: list_option,
                        trueAnwer: true_anwer
                    }
                }
            }

            //sắp xếp câu
            else if (type == "655cd3c50cf3ced3d7aecb60") {
                if (str.length < 1) {
                    //ko tồn tại trả lời
                    return false
                } else {
                    return {
                        listOption: str,
                        trueAnwer: str
                    }
                }
            }
            else {
                return 'undefindTypeQuestion'
            }
        }
        //function get all type question
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
                $(".round-questions").html(html);
                $(".ud-round").html(html)
            })
        }
        getAllTopics()
        function getAllTopics() {
            let html = "";
            $.ajax({
                url: 'get-all-topic',
                type: 'GET',
                dataType: 'json',
                encode: true,
            }).done(function (data) {
                data.reverse().map((topic) => {
                    html += `<option value = '` + topic._id + `'>` + topic.nameTopic + `</option>`;
                })
                $(".topic-questions").html(html);
                $(".ud-topic").html(html)
            })
        }

    }

});