if (!window.UI)
    window.UI = {
        Elements: {}
    }
else if (!window.UI.Elements)
    window.UI.Elements = {}

window.UI.Fonks = {
    bindElements: function () {
        UI.Elements = {
            $pAd: $('#pAd'),
            
            $pSoyAd: $('#pSoyAd'),
            $pIl: $('#pIl'),
            $pIlce: $('#pIlce'),
            $pAdres: $('#pAdres'),
            $pPostaKodu: $('#pPostaKodu'),
            $padd: $("#padd"),
        }
    },
    getUsers: function () {
        $.ajax({
            type: "GET",
            data: {
            },
            url: "/home/GetUsers",
            success: function (data) {
                data.data.forEach(function (item, index, array) {
                    $("#table tbody").append("<tr id='" + item.Id + "'><th><input type='checkbox' name='usr' value='" + item.Id + "'></th><th>" + item.Id + "</th><th>" + item.Ad + "</th><th>" + item.SoyAd + "</th><th>" + item.Il + "</th><th>" + item.Ilce + "</th><th>" + item.Adres + "</th><th>" + item.PostaKodu + "</th></tr>");
                    
                });
                $("#table input[type='checkbox']").change(functionTest);
                console.log(data);
            },
            error: function (error) {
                console.error(error);
            }
        });
    }
}

function functionTest(e) {
    var selected = [];
    //$('#table tbody tr th input:checked').each(function () {
    //    selected.push($(this).attr('value'));
    //});

    var select = [];
    //$("#table tbody #" + selected[0] + " th").each(function () {
    //    select.push($(this).html());
    //});
    const $rows = $(e.currentTarget).parents("tr").children();
    $rows.each(function (index, item) {
        select.push($(item).html());
    });
    const y=window.UI.Elements;
    Object.keys(y).forEach(function (key, index) {
        y[key].val(select[index + 2]);
    });
    //UI.Elements.$pAd.val(select[2]);
    //UI.Elements.$pSoyAd.val(select[3]);
    //UI.Elements.$pIl.val(select[4]);
    //UI.Elements.$pIlce.val(select[5]);
    //UI.Elements.$pAdres.val(select[6]);
    //UI.Elements.$pPostaKodu.val(select[7]);
}


$(function () {

    UI.Fonks.bindElements();
    UI.Fonks.getUsers();

    UI.Elements.$padd.on('click', function (e) {
        e.preventDefault();
        //e.stopImmediatePropagation();
        var data = {
            Ad: UI.Elements.$pAd.val(),
            SoyAd: UI.Elements.$pSoyAd.val(),
            Il: UI.Elements.$pIl.val(),
            Ilce: UI.Elements.$pIlce.val(),
            Adres: UI.Elements.$pAdres.val(),
            PostaKodu: UI.Elements.$pPostaKodu.val()
        }
        $.ajax({
            type: "POST",
            data: {
                u: data
            },
            url: "/home/AddUser",
            success: function (data) {
                $("#table tbody").append("<tr id='" + data.Result.Id + "'><th><input type='checkbox' name='usr' value='" + data.Result.Id + "'></th><th>" + data.Result.Id + "</th><th>" + data.Result.Ad + "</th><th>" + data.Result.SoyAd + "</th><th>" + data.Result.Il + "</th><th>" + data.Result.Ilce + "</th><th>" + data.Result.Adres + "</th><th>" + data.Result.PostaKodu + "</th></tr>");

                UI.Elements.$pAd.val(data.Result.Ad);
                UI.Elements.$pSoyAd.val(data.Result.SoyAd);
                UI.Elements.$pIl.val(data.Result.Il);
                UI.Elements.$pIlce.val(data.Result.Ilce);
                UI.Elements.$pAdres.val(data.Result.Adres);
                UI.Elements.$pPostaKodu.val(data.Result.PostaKodu);

                console.log(data);
            },
            error: function (error) {
                console.error(error);
            }
        });
    });



    $('#pdel').click(function (e) {
        e.preventDefault();

        var selected = [];
        $('#table tbody tr th input:checked').each(function () {
            selected.push($(this).attr('value'));
        });

        var select = [];
        $("#table tbody #" + selected[0] + " th").each(function () {
            select.push($(this).html());
        });

        $.ajax({
            type: "POST",
            data: {
                u: {
                    Id: select[1],
                    Ad: select[2],
                    SoyAd: select[3],
                    Il: select[4],
                    Ilce: select[5],
                    Adres: select[6],
                    PostaKodu: select[7]
                }
            },
            url: "/home/DeleteUser",
            success: function (data) {
                $("#table tbody #" + data.Result.Id + "").remove();

                $('#pAd').val(data.Result.Ad);
                $('#pSoyAd').val(data.Result.SoyAd);
                $('#pIl').val(data.Result.Il);
                $('#pIlce').val(data.Result.Ilce);
                $('#pAdres').val(data.Result.Adres);
                $('#pPostaKodu').val(data.Result.PostaKodu);

                console.log(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});

$('#pedt').click(function (e) {
    e.preventDefault();

    var selected = [];
    $('#table tbody tr th input:checked').each(function () {
        selected.push($(this).attr('value'));
    });

    $.ajax({
        type: "POST",
        data: {
            u: {
                Id: selected[0],
                Ad: $('#pAd').val(),
                SoyAd: $('#pSoyAd').val(),
                Il: $('#pIl').val(),
                Ilce: $('#pIlce').val(),
                Adres: $('#pAdres').val(),
                PostaKodu: $('#pPostaKodu').val()
            }
        },
        url: "/home/UpdateUser",
        success: function (data) {
            $("#table tbody #" + data.Result.Id + "").each(function (i, array) {
                $("#table tbody #" + data.Result.Id + " th").remove()
            })

            $("#table tbody #" + data.Result.Id + "").append("<th><input type='checkbox' name='usr' value='" + data.Result.Id + "'></th><th>" + data.Result.Id + "</th><th>" + data.Result.Ad + "</th><th>" + data.Result.SoyAd + "</th><th>" + data.Result.Il + "</th><th>" + data.Result.Ilce + "</th><th>" + data.Result.Adres + "</th><th>" + data.Result.PostaKodu + "</th>");

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