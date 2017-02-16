$.ajax({
    method: "GET",
    url: "https://api.ovva.tv/v2/ua/tvguide/1plus1/2017-02-16"
})
    .done(function (data) {
        publish(data.data.programs);
    });

let normalizeTime = function (date) {
    return moment(moment.unix(date)).add(2, 'hours').toISOString().split('T')[1].substr(0, 5);
};

let addToPage = function (prog) {
    let begin = new Date (prog.realtime_begin);
    let end = new Date (prog.realtime_end);
    $(".container").append(
        "<div class='prog_holder'>" +
        "<div class='prog-image_holder'>" +
        "<img class='prog_image' src='" + prog.image.preview + "'>" +
        "</div>" +
        "<div class='prog_decription'>" +
        "<h3 class='prog_title'>" + prog.title + "</h3>" +
        "<h4 class='prog_subtitle'>" + prog.subtitle + "</h4>" +
        normalizeTime(begin) + " - " + normalizeTime(end) +
        "</div>" +
        "</div>"
    );
};
let publish = function (programs) {
    programs.reduce((pr, cr) => {
        addToPage(cr);
    }, programs[0]);
};

