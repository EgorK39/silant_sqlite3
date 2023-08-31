from rest_framework import permissions
from django.contrib.auth.models import User, Group, Permission


class IsClientOrNothing(permissions.BasePermission):
    def has_permission(self, request, view):
        # if request.method in permissions.SAFE_METHODS:
        #     return True
        print(f"HELLO from PER: {request.user.groups.filter(name='client').exists()}")
        return bool(request.user.groups.filter(name='client').exists() or request.user.is_superuser)


class IsCompanyOrNothing(permissions.BasePermission):
    def has_permission(self, request, view):
        print(f"HELLO from PER: {request.user.groups.filter(name='organization').exists()}")
        return bool(request.user.groups.filter(name='organization').exists() or request.user.is_superuser)


class IsManagerOrNothing(permissions.BasePermission):
    def has_permission(self, request, view):
        print(f"HELLO from PER: {request.user.groups.filter(name='manager').exists()}")
        return bool(request.user.groups.filter(name='manager').exists() or request.user.is_superuser)

#
# class IsOwnerOrReadOnly(permissions.BasePermission):
#     """
#     Object-level permission to only allow owners of an object to edit it.
#     Assumes the model instance has an `owner` attribute.
#     """
#
#     def has_object_permission(self, request, view, obj):
#         # Read permissions are allowed to any request,
#         # so we'll always allow GET, HEAD or OPTIONS requests.
#         if request.method in permissions.SAFE_METHODS:
#             return True
#
#         # Instance must have an attribute named `user`.
#         return obj.user == request.user
