# Generated by Django 5.1.1 on 2024-11-19 06:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notelist',
            name='type',
            field=models.CharField(choices=[('note', 'note'), ('timestamp', 'timestamp')], max_length=9),
        ),
    ]