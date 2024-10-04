$(document).ready(function () {
    var NAME_LAYOUT = $("#DEFINENAMEPAGE").attr('layout');
    if (NAME_LAYOUT == 'IMAGEPAGE') {
        //check loader img
        var files = [],
            dragArea = document.querySelector('.drag-area'),
            input = document.querySelector('.drag-area input'),
            button = document.querySelector('.card button'),
            select = document.querySelector('.drag-area .select'),
            container = document.querySelector('.container');

        /** CLICK LISTENER */
        select.addEventListener('click', () => input.click());

        /* INPUT CHANGE EVENT */
        input.addEventListener('change', () => {
            let file = input.files;

            // if user select no image
            if (file.length == 0) return;

            for (let i = 0; i < file.length; i++) {
                if (file[i].type.split("/")[0] != 'image') continue;
                if (!files.some(e => e.name == file[i].name)) files.push(file[i])
            }

            showImages();
        });

        /** SHOW IMAGES */
        function showImages() {
            container.innerHTML = files.reduce((prev, curr, index) => {
                return `${prev}
        <div class="image">
            <span onclick="delImage(${index})">&times;</span>
            <img src="${URL.createObjectURL(curr)}" />
        </div>`
            }, '');
            console.log(files)
        }

        /* DELETE IMAGE */
        function delImage(index) {
            files.splice(index, 1);
            showImages();
        }



        function dataLoading() {
            //load all design from drive
            $.ajax({
                url: 'get-all-image-clound',
                type: 'GET',
                dataType: "json",
                encode: true,
            }).done(function (data) {
                console.log('ggdriver', data);
                let html = "";
                data.map((item) => {
                    html += ` <div class="gallery-item" >
                <div class="content image-design" style="cursor: pointer">
                    <img class="lazyload img-design-from-drive" data-sizes="auto"  data-src="`+ item.thumbnailLink + `" data-id-image=` + item.id + ` alt="">
                    <div class ="inf-image"></div>
                </div>
            </div>`;
                })
                $("#gallery").html(html);
                $(".img-design-from-drive").click(function () {
                    Swal.fire({
                        title: 'Bạn có chắc muốn xoá ảnh này trong driver?',
                        text: "Dự án nào đó chứa ảnh này sẽ bị mất, bạn buộc phải cập nhật lại dự án đó!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Chắc chắn xoá!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            let idImage = $(this).attr('data-id-image');
                            $.ajax({
                                url: 'delete-file-driver',
                                type: 'DELETE',
                                data: { fileId: idImage },
                                dataType: "json",
                                encode: true,
                            }).done(function (data) {
                                if (data == 204) {
                                    Swal.fire(
                                        'Deleted!',
                                        'Your file has been deleted.',
                                        'success'
                                    )
                                    dataLoading();
                                } else {
                                    alert(data);
                                }
                            })
                        }
                    })

                })
            })
        }

        dataLoading()

        $(".btn-bulk-upload-design").click(function () {
            $(this).html('Đăng tải...');
            $(this).attr('type', 'button').addClass('btn-inverse-dark btn-fw');
            if ($(".all-file-upload")[0].files[0]) {

                $("#form-upload-image").submit();
            } else {
                if (files) {
                    console.log('123', files);
                    $("#form-upload-image").submit();
                } else {
                    $(this).attr('type', 'submit').removeClass('btn-inverse-dark btn-fw');
                    Swal.fire('Chưa có file nào được chọn !!!')
                    $(this).html('Tải lên');

                }

            }

        })
    }
})
