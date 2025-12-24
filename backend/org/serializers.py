from django.db import transaction
from rest_framework import serializers

from typing import Dict
import json

from org.models import Company, Address


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class CompanySerializer(serializers.ModelSerializer):
    address = AddressSerializer(required=False, allow_null=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = ["code", "name", "image", "description", "is_active", "address", "created_at", "updated_at", "image_url"]
        read_only_fields = ["created_at", "updated_at"]

    def get_image_url(self, obj):
        request = self.context.get('request')
        image_path = None

        if obj.image:
            image_path = obj.image.url

        if request is not None and image_path:
            return request.build_absolute_uri(image_path)

        return image_path

    def to_internal_value(self, data):
        if hasattr(data, 'dict'):
            data = data.dict()
        else:
            data = data.copy()

        if 'image' in data:
            if data['image'] == '' or data['image'] == 'null':
                data['image'] = None

        if 'address' in data:
            address_value = data['address']
            
            if isinstance(address_value, str):
                if address_value == '' or address_value == 'null':
                    data['address'] = None
                else:
                    try:
                        decoded_address = json.loads(address_value)
                        data['address'] = decoded_address
                    except ValueError:
                        pass

        return super().to_internal_value(data)

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
