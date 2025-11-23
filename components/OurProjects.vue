<script setup>

</script>

<template>
    <div class="container-xxl py-5">
        <div class="container py-5">
            <div class="row g-5">
                <div class="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
                    <div class="btn btn-sm border rounded-pill text-primary px-3 mb-3">Testimonial</div>
                    <h1 class="mb-4">What Say Our Clients!</h1>
                    <p class="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam
                        amet diam et eos labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus
                        clita duo justo et tempor eirmod magna dolore erat amet</p>
                    <a class="btn btn-primary rounded-pill px-4" href="">Read More</a>
                </div>
                <div class="col-lg-7 wow fadeIn" data-wow-delay="0.5s">
                    <div class="owl-carousel testimonial-carousel border-start border-primary">
                        <div class="testimonial-item ps-5">
                            <i class="bi bi-quote-left fs-2 text-primary mb-3"></i>
                            <p class="fs-4">Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed
                                stet no labore lorem sit. Sanctus clita duo justo et tempor eirmod magna dolore erat
                                amet</p>
                            <div class="d-flex align-items-center">
                                <!-- <img class="img-fluid flex-shrink-0 rounded-circle" src="img/testimonial-1.jpg"
                                    style="width: 60px; height: 60px;"> -->
                                <div class="ps-3">
                                    <h5 class="mb-1">Client Name</h5>
                                    <span>Profession</span>
                                </div>
                            </div>
                        </div>
                        <div class="testimonial-item ps-5">
                            <i class="bi bi-quote-left fs-2 text-primary mb-3"></i>
                            <p class="fs-4">Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed
                                stet no labore lorem sit. Sanctus clita duo justo et tempor eirmod magna dolore erat
                                amet</p>
                            <div class="d-flex align-items-center">
                                <!-- <img class="img-fluid flex-shrink-0 rounded-circle" src="img/testimonial-2.jpg"
                                    style="width: 60px; height: 60px;"> -->
                                <div class="ps-3">
                                    <h5 class="mb-1">Client Name</h5>
                                    <span>Profession</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.testimonial-carousel {
    position: relative;
}

.testimonial-carousel .owl-nav {
    position: absolute;
    width: 40px;
    height: 100%;
    top: calc(50% - 50px);
    left: -21px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.testimonial-carousel .owl-nav .owl-prev,
.testimonial-carousel .owl-nav .owl-next {
    margin: 5px 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--cs-tech-orange-color);
    background: #FFFFFF;
    border: 1px solid var(--cs-tech-orange-color);
    border-radius: 40px;
    font-size: 18px;
    transition: .5s;
}

.testimonial-carousel .owl-nav .owl-prev:hover,
.testimonial-carousel .owl-nav .owl-next:hover {
    background: var(--cs-tech-orange-color);
    color: #FFFFFF;
}

.testimonial-carousel .owl-dots {
    margin-top: 35px;
    margin-left: 3rem;
}

.testimonial-carousel .owl-dot {
    position: relative;
    display: inline-block;
    margin-right: 10px;
    width: 15px;
    height: 15px;
    background: #FFFFFF;
    border: 1px solid var(--cs-tech-orange-color);
    border-radius: 15px;
    transition: .5s;
}

.testimonial-carousel .owl-dot.active {
    width: 30px;
    background: var(--cs-tech-orange-color);
}
</style>