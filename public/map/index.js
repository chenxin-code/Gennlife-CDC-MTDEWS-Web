$(function(){
    $('#modeType').change(function(){
        var selectType = $(this).find(':selected').val();
        UrlUtil.urlType = selectType;
        mapView.serviceUrls = mapView.modeServiceUrls[selectType];

        if(selectType === 'gateway'){
            $('.serverTipName').text('地图产品服务地址：');
            $('#busUrlPanel').hide();
        }else{
            $('.serverTipName').text('地图产品ServerCode：');
            $('#busUrl').val(UrlUtil.busUrl);
            $('#busUrlPanel').show();
        }

        $('#typeSelect').trigger('change');
    }).trigger('change');

    $('#typeSelect').change(function(){
        var selectType = $(this).find(':selected').val();
        var typeUrls = mapView.serviceUrls[selectType];

        if(selectType === 'geocoding'){
            $('.geocodingPanel').show();
            $('.serverOpPanel').hide();
            $('#geoCodingType').trigger('change');
            return;
        }else{
            $('.geocodingPanel').hide();
            $('.serverOpPanel').show();
        }

        if(selectType === 'wfs'){
            $('.wfsResultTypePanel').show();
        }else{
            $('.wfsResultTypePanel').hide();
        }

        $('#serviceTable>thead>tr').hide();
        $('tr.' + selectType + 'Tr').show();

        var tbodyHtml = '';
        if(selectType === 'wfs'){
            for(var i=0; i<typeUrls.length; i++){
                var typeUrl = typeUrls[i];
                tbodyHtml += '<tr><td>' + typeUrl.url + '</td><td>' + typeUrl.resultType + '</td><td><a class="delService" href="#" onclick="return false">删除</a></td></tr>';
            }
        }else{
            for(var i=0; i<typeUrls.length; i++){
                tbodyHtml += '<tr><td>' + typeUrls[i].url + '</td><td><a class="delService" href="#" onclick="return false">删除</a></td></tr>';
            }
        }
        
        $('#serviceTable>tbody').html(tbodyHtml);

        $('.delService').click(function(){
            var typeUrls = mapView.serviceUrls[$('#typeSelect option:selected').val()];
            var tr = $(this).parents('tr');
            typeUrls.splice(tr.index(), 1);
            tr.remove();
        });
    }).trigger('change');

    $('#addService').click(function(){
        var service = $('#service').val();
        if(!service){
            return;
        }
        var type = $('#typeSelect option:selected').val();
        var typeUrls = mapView.serviceUrls[type];
        var hasSame = false;
        for(var i=0;i<typeUrls.length; i++){
            if(service === typeUrls[i].url){
                hasSame = true;
                break;
            }
        }
        if(!hasSame){
            var typeUrl = {url: service};
            if(type === 'wfs'){
                typeUrl['resultType'] = $('input:radio[name="resultType"]:checked').val();
            }

            typeUrls.push(typeUrl);
            $('#typeSelect').trigger('change');
        }
    });

    $('#loadServices').click(function(){
        mapView.loadLayers();
    });
});

function slideToggleDialog(dialog){
    //获取指定对象
    function getNode(parentDiv,nodeName){
        for(var i = 0,len = parentDiv.childNodes.length; i < len; i++){
            var node = parentDiv.childNodes[i];
            if(nodeName == "content"){
                if(node.className != "dtitle" && node.nodeName == "DIV"){
                    return node;
                }
            }
            else if(nodeName == "img"){
                if(node.className == "dtitle"){
                    var img = node.getElementsByTagName("img")[0];
                    return img;
                }
            }
            else if(nodeName == "iframe"){
                if(node.nodeName == "IFRAME" && node.className == "bgiframe bgiframe-bottom"){
                    return node;
                }
            }
        }
    }
    //获取弹出div对象
    var dialog = document.getElementById(dialog);
    //获取图片对象
    var img = getNode(dialog,"img");
    //处理
    if(dialog.style.height == "auto"){
        dialog.style.height = "18px";
        img.src = "./img/openD.png";
    }else{
        dialog.style.height = "auto";
        img.src = "./img/closeD.png";
    }
}