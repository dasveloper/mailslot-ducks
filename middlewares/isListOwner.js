exports.variant_get = (req, res, next) => {
    const { formId } = req.query;

    var ownsList = req.user.forms.some(function (form) {
       
        return form.equals(formId);
    });

    if (!formId || !ownsList ){
        return res
          .status(401)
          .json({ success: false, message: "This contact list does not belong to you" });
      }
      next();
}
exports.variant_post = (req, res, next) => {
    const { formId } = req.body;

    var ownsList = req.user.forms.some(function (form) {
       
        return form.equals(formId);
    });

    if (!formId || !ownsList ){
        return res
          .status(401)
          .json({ success: false, message: "This contact list does not belong to you" });
      }
      next();
}