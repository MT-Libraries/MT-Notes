/**
 *
 * user-admin.
 *
 * @project     localhost_thonatos.com
 * @datetime    23:14 - 16/5/23
 * @author      Thonatos.Yang <thonatos.yang@gmail.com>
 * @copyright   Thonatos.Yang <https://www.thonatos.com>
 *
 */

Vue.config.delimiters = ['${', '}'];

var data = {
    mood: ''
};

var vm = new Vue({
    el: '#mood-add',
    data: data,
    methods: {
        postMood: function (e) {
            e.preventDefault();
            vm.$log();

            $.post('/api/moods/mood', data)
                .success(function (response) {
                    console.log(response);
                    if(response.errors) {
                        alert(response.message);
                        return;
                    }

                    if(response.code === "600"){
                        alert(response.msg);
                        return;
                    }

                    data.mood = '';
                    alert('add release success');
                })
                .fail(function() {
                    alert('net work error or server error');
                })

        },
        load: function() {
        }
    }
});

$(document).ready(function () {
    console.log(vm);
});