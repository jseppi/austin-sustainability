App
  .constant('CONTENT_PATH', '/content/')
  //TODO: Maybe put this in yaml also?
  // or read from the content yaml files (to keep everything in one place)
  .constant('SECTIONS', [
    {
      display: 'Climate and Energy',
      slug: 'climate_and_energy',
      description: 'A sustainable community includes the impacts caused by climate change and increases energy efficiency.'
    },
    {
      display: 'Natural Systems',
      slug: 'natural_systems',
      description: 'A sustainable community protects and restores the resources upon which life depends.'
    },
    {
      display: 'Equity and Empowerment',
      slug: 'equity_and_empowerment',
      description: 'A sustainable community works toward equity and inclusion for all residents.'
    },
    {
      display: 'Health and Safety',
      slug: 'health_and_safety',
      description: 'Section description text' //TODO: was not specified
    },
    {
      display: 'Arts, Education, and Culture',
      slug: 'arts_education_and_culture',
      description: 'A sustainable community supports vibrant, connected, and diverse cultures.'
    },
    {
      display: 'Economy and Jobs',
      slug: 'economy_and_jobs',
      description: 'A sustainable community provides access to quality jobs and shared prosperity for all.'
    },
    {
      display: 'Built Environment',
      slug: 'built_environment',
      description: 'A sustainable community provides quality, choice, and access in the built environment, where people live, work, and play.'
    }
  ]);