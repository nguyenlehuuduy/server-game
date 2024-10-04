$(document).ready(function () {
    var NAME_LAYOUT = $("#DEFINENAMEPAGE").attr('layout');
    console.log("Hello Hữu Duy");
    if (NAME_LAYOUT == 'REPORTPAGE') {
        console.log(NAME_LAYOUT);
        getAllReport();

        function getAllReport() {
            $.ajax({
                url: 'all-report',
                type: 'GET',
                dataType: "json",
                encode: true,
            }).done(function (data) {
                console.log("Tui đã ở đ")
                let html = '';
                data.reverse().map((report) => {
                    html += `<tr>
                                <td class="border-bottom-0">
                                    <h6 class="fw-semibold mb-1">${report.reportcontent}</h6>`;
                    if (report.idUser) {
                        html += `<p>${report.idUser.name}</p>`;
                    } else {
                        html += '<p>null</p>';
                    }
                    html += `  </td>
                            </tr>`;
                });

                // Chèn chuỗi HTML vào DOM
                $("#someElementId").html(html);
            });
        }
        //function close component in pre-layout
    } else {
        console.log('bug')
    }
});
