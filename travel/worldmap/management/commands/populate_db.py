from django.core.management.base import BaseCommand
from worldmap.models import Region, Type, Location



class Command(BaseCommand):
    args = '<foo bar ...>'
    help = 'This function populates the db regions and locations'

    def _create_types(self):
        nature = Type(name='Nature', description='This is the region for nature')
        nature.save()

        city = Type(name='City', description='This is the region for cities')
        city.save()

        road = Type(name='Road', description='This is the region for roads')
        road.save()

    def _create_regions(self):
        nature = Region(name='West', description='This is the region for the west of the US')
        nature.save()

        city = Region(name='Midwest', description='This is the region for the midwest of the US')
        city.save()

        road = Region(name='South', description='This is the region for the south of the US')
        road.save()

        road = Region(name='Northeast', description='This is the region for the northeast of the US')
        road.save()

    def _create_locations(self):
        midwest = Region.objects.get(name='Midwest')
        west = Region.objects.get(name='West')
        south = Region.objects.get(name='South')
        northeast = Region.objects.get(name='Northeast')

        city = Type.objects.get(name='City')
        nature = Type.objects.get(name='Nature')
        roads = Type.objects.get(name='Road')

        denver = Location(name='Denver',
                          lat='39.777128',
                          lng='-104.989211',
                          description='Denver, Capitol of Colorado!',
                          type=city,
                          rank= 10,
                          region=midwest)
        denver.save()

        sanfran = Location(name='San Francisco',
                          lat='37.77105',
                          lng='-122.423851',
                          description='San Francisco, Tech Base of the US!',
                          type=city,
                          rank=15,
                          region=west)
        sanfran.save()

        omaha = Location(name='Omaha',
                          lat='41.256537',
                          lng='-95.934503',
                          description='Omaha, Gateway to the West!',
                          type=city,
                          rank=8,
                          region=midwest)
        omaha.save()

        newyork = Location(name='New York',
                          lat='40.712775',
                          lng='-74.005973',
                          description='New York, Big Apple!',
                          type=city,
                          rank=13,
                          region=northeast)
        newyork.save()

        yosemite = Location(name='Yosemite',
                          lat='37.865101',
                          lng='-119.538329',
                          description='Yosemite, Best National Park!',
                          type=nature,
                          rank=15,
                          region=west)
        yosemite.save()

        yellowstone = Location(name='Yellowstone',
                          lat='44.427963',
                          lng='-110.588455',
                          description='Yellowstone, Wyomings Treasure!',
                          type=nature,
                          rank=10,
                          region=midwest)
        yellowstone.save()

        santaMonica = Location(name='Route66 SantaMonica',
                          lat='34.019454',
                          lng='-118.491191',
                          description='Santa Monica, End of Route 66!',
                          type=roads,
                          rank=15,
                          region=west)
        santaMonica.save()

        amarillo = Location(name='Route66 Amarillo',
                               lat='35.221997',
                               lng='-101.831297',
                               description='Amarillo, Mid of Route 66!',
                               type=roads,
                               rank=9,
                               region=south)
        amarillo.save()


    def handle(self, *args, **options):
        self._create_types()
        self._create_regions()
        self._create_locations()