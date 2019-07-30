(function () {
            $(document).ready(function () {

            var t = $('#table_id').DataTable({
                "processing": true,
                "ajax": '/home/GetUsers',
                "columns": [
                           { data: "Id" },
                           { data: "Ad" },
                           { data: "SoyAd" },
                           { data: "Il" },
                           { data: "Ilce" },
                           { data: "Adres" },
                           { data: "PostaKodu" }
                ]
            });

            $("#add").on('click', function (e) {
                e.preventDefault();
                //e.stopImmediatePropagation();
                var data = {
                    Ad: $('#Ad').val(),
                    SoyAd: $('#SoyAd').val(),
                    Il: $('#Il').val(),
                    Ilce: $('#Ilce').val(),
                    Adres: $('#Adres').val(),
                    PostaKodu: $('#PostaKodu').val()
                }
                $.ajax({
                    type: "POST",
                    data: {
                        u: data
                    },
                    url: "/home/AddUser",
                    success: function (data) {
                        t.row.add(data.Result).draw(false);

                        $('#Ad').val(data.Result.Ad);
                        $('#SoyAd').val(data.Result.SoyAd);
                        $('#Il').val(data.Result.Il);
                        $('#Ilce').val(data.Result.Ilce);
                        $('#Adres').val(data.Result.Adres);
                        $('#PostaKodu').val(data.Result.PostaKodu);

                        console.log(data);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            });

            $('#table_id tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    t.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
                var dat = t.row('.selected').data();
                if (dat != null) {
                    $('#Ad').val(dat.Ad);
                    $('#SoyAd').val(dat.SoyAd);
                    $('#Il').val(dat.Il);
                    $('#Ilce').val(dat.Ilce);
                    $('#Adres').val(dat.Adres);
                    $('#PostaKodu').val(dat.PostaKodu);
                }
                console.log(dat);
            });

            $('#del').click(function (e) {
                e.preventDefault();

                var dat = t.row('.selected').data();

                $.ajax({
                    type: "POST",
                    data: {
                        u: dat
                    },
                    url: "/home/DeleteUser",
                    success: function (data) {
                        t.row('.selected').remove().draw(false);

                        $('#Ad').val(data.Result.Ad);
                        $('#SoyAd').val(data.Result.SoyAd);
                        $('#Il').val(data.Result.Il);
                        $('#Ilce').val(data.Result.Ilce);
                        $('#Adres').val(data.Result.Adres);
                        $('#PostaKodu').val(data.Result.PostaKodu);

                        console.log(data);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            });

            $('#edt').click(function (e) {
                e.preventDefault();

                var dat = t.row('.selected').data();
                var newdata = {
                    Id: dat.Id,
                    Ad: $('#Ad').val(),
                    SoyAd: $('#SoyAd').val(),
                    Il: $('#Il').val(),
                    Ilce: $('#Ilce').val(),
                    Adres: $('#Adres').val(),
                    PostaKodu: $('#PostaKodu').val()
                };

                $.ajax({
                    type: "POST",
                    data: {
                        u: newdata
                    },
                    url: "/home/UpdateUser",
                    success: function (data) {
                        t.row('.selected').remove().draw(false);
                        t.row.add(newdata).draw(false);

                        $('#Ad').val(data.Result.Ad);
                        $('#SoyAd').val(data.Result.SoyAd);
                        $('#Il').val(data.Result.Il);
                        $('#Ilce').val(data.Result.Ilce);
                        $('#Adres').val(data.Result.Adres);
                        $('#PostaKodu').val(data.Result.PostaKodu);

                        console.log(data);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            });

        });
})();