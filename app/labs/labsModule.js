/**
 * Created by thonatos on 14/12/16.
 */

exports.Controller = {
    htmlVideo : function(req,res){
        res.render('labs/html-video', {
            pageTitle: 'Live',
            liveFlag: true
        });
    },
    updateBrowser : function(req,res){
        res.render('labs/update-browser', {
            pageTitle: 'Update Browser'
        });
    },
    mtNotes : function(req,res){
        res.render('labs/mt-notes', {
            pageTitle: 'MT Notes'
        });
    }
};