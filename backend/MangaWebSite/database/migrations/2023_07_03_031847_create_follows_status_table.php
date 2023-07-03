<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('follows_status', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('manga_id')->nullable()->onDelete('cascade');
            $table->unsignedBigInteger('user_id')->nullable()->onDelete('cascade');
            $table->enum('status', ['reading', 'completed', 'plan-to-read', 'dropped'])->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('follows_status');
    }
};
