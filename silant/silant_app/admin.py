from django.contrib import admin
from .models import *

admin.site.register(Car)
admin.site.register(ModelOfServiceCompany)
admin.site.register(ModelOfClients)
admin.site.register(ModelOfTechnic)
admin.site.register(ModelOfEngine)
admin.site.register(ModelOfTransmission)
admin.site.register(ModelOfDrivingBridge)
admin.site.register(ModelOfControlledBridge)


admin.site.register(TO)
admin.site.register(TypeOfTo)
# admin.site.register(ListOfOrg)

admin.site.register(Reclamation)
admin.site.register(Rejection)
admin.site.register(RecoveryMethod)

# admin.site.register(MyModelForClient)





