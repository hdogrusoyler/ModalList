
$(function () {

    let mUI = {
        Elements: {
            $tableBody: $('#mtable tbody'),
            $modal: $('#myModal'),

            $mAd: $('#mAd'),
            $mSoyAd: $('#mSoyAd'),
            $mIl: $('#mIl'),
            $mIlce: $('#mIlce'),
            $mAdres: $('#mAdres'),
            $mPostaKodu: $('#mPostaKodu'),

            $madd: $("#madd"),
            $medt: $("#medt"),
            $mdel: $("#mdel")
        },
        Values: {
            Id: "",
            Data: {
                Ad: mUI.Elements.$mAd.val(),
                SoyAd: mUI.Elements.$mSoyAd.val(),
                Il: mUI.Elements.$mIl.val(),
                Ilce: mUI.Elements.$mIlce.val(),
                Adres: mUI.Elements.$mAdres.val(),
                PostaKodu: mUI.Elements.$mPostaKodu.val()
            }
        },
        Fonks: {
            getUsers: function () {
                $.ajax({
                    type: "GET",
                    data: {
                    },
                    url: "/home/GetUsers",
                    success: function (data) {
                        data.data.forEach(function (item, index, array) {
                            mUI.Elements.$tableBody.append("<tr id='" + item.Id + "'><th><input class='fnselections' type='checkbox' name='usr' value='" + item.Id + "'></th><th>" + item.Id + "</th><th data-name='mAd'>" + item.Ad + "</th><th data-name='mSoyAd'>" + item.SoyAd + "</th><th data-name='mIl'>" + item.Il + "</th><th data-name='mIlce'>" + item.Ilce + "</th><th data-name='mAdres'>" + item.Adres + "</th><th data-name='mPostaKodu'>" + item.PostaKodu + "</th></tr>");
                        });
                        $(".fnselections").change(mUI.Fonks.getSelections);

                        console.log(data);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            },
            getSelections: function () {
                if ($(this).is(":checked")) {

                    let select = [];
                    $(this).parents("tr").children().each(function () {
                        select.push($(this).html());
                    });

                    mUI.Elements.$mAd.val(select[2]);
                    mUI.Elements.$mSoyAd.val(select[3]);
                    mUI.Elements.$mIl.val(select[4]);
                    mUI.Elements.$mIlce.val(select[5]);
                    mUI.Elements.$mAdres.val(select[6]);
                    mUI.Elements.$mPostaKodu.val(select[7]);

                    mUI.Values.Id = select[1];

                    mUI.Elements.$modal.modal('show');
                }
            },
            addUser: function (e) {

                let data = mUI.Values.Data;

                $.ajax({
                    type: "POST",
                    data: {
                        u: data
                    },
                    url: "/home/AddUser",
                    success: function (data) {
                        mUI.Elements.$tableBody.append("<tr id='" + data.Result.Id + "'><th><input class='fnselections' type='checkbox' name='usr' value='" + data.Result.Id + "'></th><th>" + data.Result.Id + "</th><th>" + data.Result.Ad + "</th><th>" + data.Result.SoyAd + "</th><th>" + data.Result.Il + "</th><th>" + data.Result.Ilce + "</th><th>" + data.Result.Adres + "</th><th>" + data.Result.PostaKodu + "</th></tr>");

                        $(".fnselections").change(mUI.Fonks.getSelections);
                        mUI.Elements.$modal.modal('hide');
                         
                        console.log(data);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
                e.preventDefault();
            },
            delUser: function (e) {

                let data = data = mUI.Values.Data;

                console.log(data);

                $.ajax({
                    type: "POST",
                    data: {
                        u: data
                    },
                    url: "/home/DeleteUser",
                    success: function (data) {

                        $("#mtable tbody #" + data.Result.Id + "").remove();
                        mUI.Elements.$modal.modal('hide');

                        console.log(data);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
                e.preventDefault();
            },
            updUser: function (e) {

                let data = data = mUI.Values.Data;

                $.ajax({
                    type: "POST",
                    data: {
                        u: data
                    },
                    url: "/home/UpdateUser",
                    success: function (data) {
                        $("#mtable tbody #" + data.Result.Id + "").each(function (i, array) {
                            //$("#table tbody #" + data.Result.Id + " th").text(data.Result[i])
                            $("#mtable tbody #" + data.Result.Id + " th").remove()
                        })
                        //$("#table tbody #" + data.Result.Id + "").remove();
                        $("#mtable tbody #" + data.Result.Id + "").append("<th><input type='checkbox' name='usr' value='" + data.Result.Id + "'></th><th>" + data.Result.Id + "</th><th>" + data.Result.Ad + "</th><th>" + data.Result.SoyAd + "</th><th>" + data.Result.Il + "</th><th>" + data.Result.Ilce + "</th><th>" + data.Result.Adres + "</th><th>" + data.Result.PostaKodu + "</th>");

                        mUI.Elements.$modal.modal('hide');

                        console.log(data);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
                e.preventDefault();
            }
        }
    }

    mUI.Fonks.getUsers();

    mUI.Elements.$madd.click(mUI.Fonks.addUser);
    mUI.Elements.$mdel.click(mUI.Fonks.delUser);
    mUI.Elements.$medt.click(mUI.Fonks.updUser);
});
