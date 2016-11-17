module.exports = function (kibana) {
    return new kibana.Plugin({
        uiExports: {
            visTypes: [
                'plugins/world_map_vis/world_map_vis'
            ]
        }
    });
};