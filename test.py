from django.utils.translation import gettext as _


miesiac = 22233333
dzien = 'wtorek'


def my_view(m, d):
    output = 'Today is {0} - {0:,}.....{1}'.format(m, d)
    # output = f"{m} + {d}"
    return output


print(my_view(miesiac, dzien))

