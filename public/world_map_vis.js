/* jshint esversion: 6 */

define(function (require) {
  // we need to load the css ourselves
  require('plugins/world_map_vis/world_map_vis.less');

  // we also need to load the controller and used by the template
  require('plugins/world_map_vis/world_map_vis_controller');

  // register the provider with the visTypes registry
  require('ui/registry/vis_types').register(WorldMapVisProvider);

  function WorldMapVisProvider(Private) {
    const TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    const Schemas = Private(require('ui/Vis/Schemas'));

    // return the visType object, which kibana will use to display and configure new
    // Vis object of this type.
    return new TemplateVisType({
      name: 'world-map',
      title: 'World Map',
      description: 'A World Map for testing purposes',
      icon: 'fa-calculator',
      template: require('plugins/world_map_vis/world_map_vis.html'),
      params: {
        defaults: {
          handleNoResults: true,
          fontSize: 60,
          invertScale: false,
          redThreshold: 0,
          greenThreshold: 0,
          redColor: "#fd482f",
          yellowColor: "#ffa500",
          greenColor: "#6dc066"
        },
        editor: require('plugins/world_map_vis/world_map_vis_params.html')
      },
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          min: 1,
          max: 1,
          defaults: [
            { type: 'count', schema: 'metric' }
          ]
        },
        {
          group: 'buckets',
          name: 'tags',
          title: 'Tags',
          min: 1,
          max: 1,
          aggFilter: '!geohash_grid'
        }
      ])
    });
  }

  // export the provider so that the visType can be required with Private()
  return WorldMapVisProvider;
});
