
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
            Id: ""
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
                    $("#Id").val(select[1]).trigger("change");
                    mUI.Elements.$mAd.val(select[2]).trigger("change");
                    mUI.Elements.$mSoyAd.val(select[3]).trigger("change");
                    mUI.Elements.$mIl.val(select[4]).trigger("change");
                    mUI.Elements.$mIlce.val(select[5]).trigger("change");
                    mUI.Elements.$mAdres.val(select[6]).trigger("change");
                    mUI.Elements.$mPostaKodu.val(select[7]).trigger("change");

                    //mUI.Values.Id = select[1];

                    mUI.Elements.$modal.modal('show');
                }
            },
            addUser: function (e) {

                //let data = {
                //    Ad: mUI.Elements.$mAd.val(),
                //    SoyAd: mUI.Elements.$mSoyAd.val(),
                //    Il: mUI.Elements.$mIl.val(),
                //    Ilce: mUI.Elements.$mIlce.val(),
                //    Adres: mUI.Elements.$mAdres.val(),
                //    PostaKodu: mUI.Elements.$mPostaKodu.val()
                //}
                mUI.Data.Id=null;
                $.ajax({
                    type: "POST",
                    data: {
                        u: mUI.Data
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

                //mUI.Data = {
                //    Id: mUI.Values.Id,
                //    Ad: mUI.Elements.$mAd.val(),
                //    SoyAd: mUI.Elements.$mSoyAd.val(),
                //    Il: mUI.Elements.$mIl.val(),
                //    Ilce: mUI.Elements.$mIlce.val(),
                //    Adres: mUI.Elements.$mAdres.val(),
                //    PostaKodu: mUI.Elements.$mPostaKodu.val()
                //}

                console.log(mUI.Data);

                $.ajax({
                    type: "POST",
                    data: {
                        u: mUI.Data
                    },
                    url: "/home/DeleteUser",
                    success: function (data) {

                        $("#mtable tbody #" + data.Result.Id + "").remove();
                        mUI.Elements.$modal.modal('hide');

                        //console.log(data);

                        console.log(mUI.Data);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
                e.preventDefault();
            },
            updUser: function (e) {

                //let data = {
                //    Id: mUI.Values.Id,
                //    Ad: mUI.Elements.$mAd.val(),
                //    SoyAd: mUI.Elements.$mSoyAd.val(),
                //    Il: mUI.Elements.$mIl.val(),
                //    Ilce: mUI.Elements.$mIlce.val(),
                //    Adres: mUI.Elements.$mAdres.val(),
                //    PostaKodu: mUI.Elements.$mPostaKodu.val()
                //}

                $.ajax({
                    type: "POST",
                    data: {
                        u: mUI.Data
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
            },
            ChangeData: function (e) {
                const {name} = e.currentTarget.dataset;
                mUI.Data[name]= e.currentTarget.value;
            },
            getData: function () {
                mUI.Data = {
                    Id: mUI.Values.Id,
                    Ad: mUI.Elements.$mAd.val(),
                    SoyAd: mUI.Elements.$mSoyAd.val(),
                    Il: mUI.Elements.$mIl.val(),
                    Ilce: mUI.Elements.$mIlce.val(),
                    Adres: mUI.Elements.$mAdres.val(),
                    PostaKodu: mUI.Elements.$mPostaKodu.val()
                }
            }
        },
        Data: {
            Id: null,
            Ad: "",
            SoyAd: "",
            Il: "",
            Ilce: "",
            Adres: "",
            PostaKodu: "",
        },
        init: function () {
            const { $mAd,$mSoyAd,$mIl,$mIlce,$mAdres,$mPostaKodu} = mUI.Elements;
            const {ChangeData,getUsers} = mUI.Fonks;
            $("#Id").change(ChangeData);
           $mAd.change(ChangeData);
            $mSoyAd.change(ChangeData);
            $mIl.change(ChangeData);
            $mIlce.change(ChangeData);
            $mAdres.change(ChangeData);
            $mPostaKodu.change(ChangeData);
            
            getUsers();

            mUI.Elements.$madd.click(mUI.Fonks.addUser);
            mUI.Elements.$mdel.click(mUI.Fonks.delUser);
            mUI.Elements.$medt.click(mUI.Fonks.updUser);
        }
    }

    mUI.init();
});
