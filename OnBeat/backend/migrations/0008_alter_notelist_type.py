# Generated by Django 5.1.1 on 2024-11-29 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_bookmark'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notelist',
            name='type',
            field=models.CharField(choices=[('timestamp', 'timestamp'), ('note', 'note')], max_length=9),
        ),
    ]