/**
 * Created by zhaohai1 on 2017/6/7.
 */
//新增一行
$(".jsAddLine").live("click", function () {
    $('.tbody-box').append('<tr><td><div contenteditable="true" class="div-textarea div-projct" placeholder="请输入..."></div></td><td><div contenteditable="true" class="div-textarea div-target" placeholder="请输入..."></div></td><td><input class="input-weight" type="text" placeholder="输入0-100的数" onfocus=this.placeholder="" onblur=this.placeholder="输入0-100的数"></td><td><div class="select-person"><a class="format-chooseman" href="javascript:;"><span>选择人员</span><i>+</i></a><div class="format-percent">%</div><ul class="selectedlist"></ul></div><!--删除一行--><div class="delete-line">x</div></td></tr>');
    $('.tbody-box td').last().append('<div class="add-line jsAddLine"><img src="/assets/img/plus.png" alt="none" />新增一行</div>');
    $(this).remove();
    inputNumber();
    inputWeight();
    textarea_focus();
});

//删除行
$('.delete-line').live('click', function () {
    var trlist = $('.tbody-box tr').length - 1;
    $(this).parent().parent().remove();
    if (trlist == 0) {
        $('.thead-box th').last().append('<div class="add-line jsAddLine"><img src="/assets/img/plus.png" alt="none" />新增一行</div>');
    } else if ($('.add-line').length==0){
        $('.tbody-box td').last().append('<div class="add-line jsAddLine"><img src="/assets/img/plus.png" alt="none" />新增一行</div>');
    }
});

//选择人员
$('.format-chooseman').live('click',function(){
    var thisclick = $(this);
    var selList = thisclick.siblings('.selectedlist');
    var selected = selList.find('li');
    if (selected && selected.length>0){
        for (var i = 0;i<selected.length;i++){
            selected[i].no = $(selected[i]).attr('evaluatorCode');
            selected[i].name = $(selected[i]).find('.selectedman').text();
        }
    }
    personSelector.open({
            type:2,
            param:{selected:selected?selected:[]}
        },function(data){
            selList.empty();
            var arr = data.selected;
            for(var i=0;i<arr.length;i++){
                selList.append('<li evaluatorCode="'+arr[i].no+'"><div class="selectedman">'+arr[i].name+'<i class="delete-selected"></i></div><input type="text" class="slctpercent" /></li>');
            }
            inputNumber();
        }
    );
});

//删除所选人员
$('.delete-selected').live('click',function() {
    $(this).closest('li').remove();
});

//input框只能输入黏贴正整数
function inputNumber() {
    $('input').keyup(function () {
        this.value=this.value.replace(/\D/g,'')
    });
}

//权重值的判断
function inputWeight() {
    $('.slctpercent,.input-weight').live('blur',function(){
        var value = $(this).val();
        if(!/^(\d{1,2}|100)$/.test(value) && value) {
            layer.msg('请输入0-100的数字',{time: 1000});
            $(this).val('');
            return false;
        }
    });
}