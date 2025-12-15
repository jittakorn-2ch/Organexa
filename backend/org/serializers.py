from django.db import transaction
from rest_framework import serializers

from typing import Dict

from org.models import Company, Address


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class CompanySerializer(serializers.ModelSerializer):
    address = AddressSerializer(required=False, allow_null=True)

    class Meta:
        model = Company
        fields = ["code", "name", "image", "description", "is_active", "address", "created_at", "updated_at"]
        read_only_fields = ["created_at", "updated_at"]

    def create(self, validated_data):
        address_data = validated_data.pop("address", None)

        address = None
        if address_data:
            address = Address.objects.create(**address_data)

        company = Company.objects.create(address=address, **validated_data)
        return company

    @transaction.atomic
    def update(self, instance: Company, validated_data: Dict) -> Company:
        address_data = validated_data.pop("address", serializers.empty)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if address_data is not serializers.empty:
            if address_data is None:
                if instance.address:
                    instance.address.delete()
                    instance.address = None
                    instance.save(update_fields=["address"])
            else:
                if instance.address:
                    for attr, value in address_data.items():
                        setattr(instance.address, attr, value)
                    instance.address.save()
                else:
                    instance.address = Address.objects.create(**address_data)
                    instance.save(update_fields=["address"])

        return instance
