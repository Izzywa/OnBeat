# Generated by Django 5.1.1 on 2024-12-01 04:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0012_alter_notelist_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notelist',
            name='type',
            field=models.CharField(choices=[('timestamp', 'timestamp'), ('note', 'note')], max_length=9),
        ),
    ]